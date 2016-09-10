'use strict';

var Utils = require('./utils');
var DatabaseObject = require('./database_object');

const TIMEOUT_MS = 600;

//*************************************************************************
// Split up the requested read/write block into small chunks since a single
// read/write request can only handle up to 29 bytes. We return those chunks in
// a list that can be requested one-by-one.
function buildChunks(offset, count, maxChunkSize) {
  let chunks = [];

  maxChunkSize = maxChunkSize || 29;

  while (count) {
    let len = count > maxChunkSize ? maxChunkSize : count;
    chunks.push({
      o: offset,
      c: len
    });

    offset += len;
    count -= len;
  }

  return chunks;
}


// A global object that holds the currently loaded transmitter and model
// object.
//
// These objects determine the values shown and manipulated on almost all
// pages of the configurator app.
class Device {

  constructor() {
    this.MODEL = undefined;
    this.TX = undefined;
    this.UNDO = undefined;
    this.connected = false;
    this.wsOpen = false;
    this.live = {};

    this.TX_FREE_TO_CONNECT = 0x30;
    this.CFG_REQUEST_TO_CONNECT = 0x31;
    this.CFG_READ = 0x72;
    this.CFG_WRITE = 0x77;
    this.CFG_COPY = 0x63;
    this.CFG_DISCONNECT = 0x64;
    this.TX_INFO = 0x49;
    this.TX_REQUESTED_DATA = 0x52;
    this.TX_WRITE_SUCCESSFUL = 0x57;
    this.TX_COPY_SUCCESSFUL = 0x43;
    this.WS_MAX_PACKETS_IN_TRANSIT = 0x42;

    document.addEventListener('ws-close', this.onclose.bind(this));
    document.addEventListener('ws-message', this.onLiveMessage.bind(this));
  }

  //*************************************************************************
  enableCommunication() {
    this.wsOpen = true;
    WebsocketProtocol.open();
  }

  //*************************************************************************
  disableCommunication() {
    // stop WS, kill restart timer
    this.wsOpen = false;
    WebsocketProtocol.close();
  }

  //*************************************************************************
  connect(uuid, passphrase) {
    console.log(`Device.connect uuid=${uuid} passphrase=${passphrase}`)

    let connectPacket = new Uint8Array([
      this.CFG_REQUEST_TO_CONNECT,
      0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      0x12, 0x13, 0x14, 0x15, 0x16,
      0x34, 0x12,
      0x00, 0x01]);

    connectPacket.set(Utils.string2uuid(uuid), 1);
    connectPacket.set(Utils.newRandomAddress(), 1 + 8);
    Utils.setUint16(connectPacket, passphrase, 1 + 8 + 5);
    connectPacket.set(Utils.newHopChannelLFSR(), 1 + 8 + 5 + 2);
    this.live = {};

    let self = this;

    return new Promise((resolve, reject) => {
      let timer;

      function cleanup() {
        clearTimeout(timer);
        document.removeEventListener('ws-message', onmessage);
        document.removeEventListener('ws-close', onclose);
      }

      function onmessage(event) {
        let packet = event.detail;

        if (packet[0] === self.TX_INFO) {
          cleanup();
          self.connected = true;
          resolve();
          return;
        }
      }

      function onclose(event) {
        cleanup();
        reject(new Error('Connection closed'));
      }

      function ontimeout() {
        cleanup();
        reject(new Error('Connection timeout'));
      }

      document.addEventListener('ws-message', onmessage);
      document.addEventListener('ws-close', onclose);
      timer = setTimeout(ontimeout, TIMEOUT_MS);
      WebsocketProtocol.send(connectPacket);
    });
  }

  //*************************************************************************
  disconnect() {
    if (!this.connected) {
      return Promise.reject(new Error('Device.disconnect: not connected'));
    }

    let self = this;

    return new Promise((resolve, reject) => {
      function onmessage(event) {
        let disconnectPacket = new Uint8Array([self.CFG_DISCONNECT]);

        WebsocketProtocol.send(disconnectPacket);

        self.connected = false;
        document.removeEventListener('ws-message', onmessage);
        document.removeEventListener('ws-close', onclose);
        resolve();
      }

      function onclose(event) {
        self.connected = false;
        document.removeEventListener('ws-message', onmessage);
        document.removeEventListener('ws-close', onclose);
        reject(new Error('Connection closed'));
      }

      document.addEventListener('ws-message', onmessage);
      document.addEventListener('ws-close', onclose);
    });
  }

  //*************************************************************************
  read(offset, count) {
    console.log(`Device.read o=${offset} c=${count}`)

    if (!this.connected) {
      return Promise.reject(new Error('Device.read: not connected'));
    }

    let self = this;

    return new Promise((resolve, reject) => {
      let data = new Uint8Array(count);
      let readChunks = buildChunks(offset, count);

      function response(packet) {
        if (packet[0] !== self.TX_REQUESTED_DATA) {
          console.log('read(): not a READ response');
          return;
        }

        const o = Utils.getUint16(packet, 1);
        const c = packet.length - 3;

        // Check if the read data is one of the chunks we are looking
        // for. If yes, store the data at the appropriate offset
        // and remove the chunk from our request list.
        const index = readChunks.findIndex((element, index, array) => {
          return element.o === o  &&  element.c === c;
        });
        if (index >= 0) {
          data.set(packet.slice(3), o - offset);
          readChunks.splice(index, 1);
        }

        // If there are no more readChunks left then resolve the read request
        if (readChunks.length === 0) {
          resolve(data);
        }
      }

      readChunks.forEach(chunk => {
        let readPacket = WebsocketProtocol.makeReadPacket(chunk.o, chunk.c);

        WebsocketProtocol.send(readPacket)
        .then(response)
        .catch(error => {
          reject(error);
        });
      });
    });
  }

  //*************************************************************************
  write(offset, data) {
    console.log(`Device.write o=${offset} c=${data.length}`)

    if (!this.connected) {
      return Promise.reject(new Error('Device.write: not connected'));
    }

    let self = this;

    return new Promise((resolve, reject) => {
      let writeChunks = buildChunks(offset, data.length);

      function response(packet) {
        if (packet[0] !== self.TX_WRITE_SUCCESSFUL) {
          return;
        }

        const o = Utils.getUint16(packet, 1);
        const c = packet[3];

        // Check if the written data is one of the chunks we are looking
        // for. If yes, store the data at the appropriate offset
        // and remove the chunk from our request list.
        const index = writeChunks.findIndex((element, index, array) => {
          return element.o === o  &&  element.c === c;
        });
        if (index >= 0) {
          writeChunks.splice(index, 1);
        }

        // If there are no more writeChunks left then resolve the write request
        if (writeChunks.length === 0) {
          resolve(data);
        }
      }

      writeChunks.forEach(chunk => {
        const dataOffset = chunk.o - offset;
        let writePacket = WebsocketProtocol.makeWritePacket(
          chunk.o, data.slice(dataOffset, dataOffset + chunk.c));

        WebsocketProtocol.send(writePacket)
        .then(response)
        .catch(error => {
          reject(error);
        });
      });
    });
  }

  //*************************************************************************
  copy(src, dst, count) {
    console.log(`Device.copy src=${src} dst=${dst} c=${count}`)

    if (!this.connected) {
      return Promise.reject(new Error('Device.copy: not connected'));
    }

    return new Promise((resolve, reject) => {
      let copyPacket = WebsocketProtocol.makeCopyPacket(src, dst, count);

      WebsocketProtocol.send(copyPacket)
      .then(() => {
        resolve();
      })
      .catch(error => {
        reject(error);
      });
    });
}

  //*************************************************************************
  onclose(event, data) {
    // console.log('Device ws: ', event, event.detail);
    this.connected = false;
    this.live = {};
    if (this.wsOpen) {
      Utils.sendCustomEvent('dev-connectionlost');

      // Retry in 2 seconds
      setTimeout(function () {
        WebsocketProtocol.open();
      }, 2000);
    }
  }

  //*************************************************************************
  makeNewDevice(configVersion, schemaName) {
    let newDevice = {};

    const schema = CONFIG_VERSIONS[configVersion][schemaName];

    newDevice.configVersion = configVersion;
    newDevice.schemaName = schemaName;
    newDevice.data = new Uint8Array(schema.s);
    newDevice.lastChanged = 0;
    newDevice.uuid = Utils.newUUID();

    let newDBObject = new DatabaseObject(newDevice);

    // NOTE: setting the uuid will automatically added the device to the
    // database!
    newDBObject.setItem('UUID', newDevice.uuid);

    let name = schemaName + ' ' + newDevice.uuid.toUpperCase().slice(0, 4);
    newDBObject.setItem('NAME', name);

    return newDBObject;
  }

  //*************************************************************************
  getActiveItems(item, offset) {
    let result = [];

    if (! this.TX) {
      return result;
    }

    if (item === 'MIXER_UNITS_SRC') {
      let schema = this.TX.getSchema();
      let count = schema.LOGICAL_INPUTS.c;
      let size = schema.LOGICAL_INPUTS.s;

      for (let i = 0; i < count; i++) {
        let offset = i * size;
        let labels = this.TX.getItem('LOGICAL_INPUTS_LABELS', {offset: offset});
        for (let j = 0; j < labels.length; j++) {
          result.push(labels[j]);
        }
      }
    }
    else if (item === 'LOGICAL_INPUTS_LABELS') {
      // Load all potential labels
      let type = this.TX.getType(item);
      let labels = this.TX.getTypeMembers(type);

      let schema = this.TX.getSchema();
      let logicalInputs = schema.LOGICAL_INPUTS;
      let count = logicalInputs.c;
      let size = logicalInputs.s;

      // For all logical inputs:
      for (let i = 0; i < count; i++) {
        let o = i * size;
        let type = this.TX.getItemNumber('LOGICAL_INPUTS_TYPE', {offset: o});
        // Skip if the logical input is unused, or the one that we are selecting
        if (o === offset  ||  type === 0) {
          continue;
        }

        // Retrieve the labels assigned to the logical input
        let l = this.TX.getItem('LOGICAL_INPUTS_LABELS', {offset: o});
        // Remove the labels from the total list of labels
        for (let j = 0; j < l.length; j++) {
          let index = labels.indexOf(l[j]);
          if (index >= 0) {
            labels.splice(index, 1);
          }
        }
      }

      result = labels;
    }
    else if (item === 'LOGICAL_INPUTS_HARDWARE_INPUTS') {
      let schema = this.TX.getSchema();
      let count = schema.HARDWARE_INPUTS.c;
      let size = schema.HARDWARE_INPUTS.s;

      for (let i = 0; i < count; i++) {
        let o = i * size;
        let pinName = this.TX.getItem('HARDWARE_INPUTS_PCB_INPUT_PIN_NAME', {offset: o});
        let type = this.TX.getItemNumber('HARDWARE_INPUTS_TYPE', {offset: o});

        if (this.isValidHardwareType(type, offset)) {
          result.push(pinName);
        }
      }
    }

    return result;
  }

  //*************************************************************************
  overrideType(item, offset) {
    if (! this.TX) {
      return [];
    }

    if (item === 'HARDWARE_INPUTS_TYPE') {
      let pcbInputType = this.TX.getItemNumber('HARDWARE_INPUTS_PCB_INPUT_TYPE', {offset: offset});
      if (pcbInputType === 2) {
        return this.TX.getTypeMembers('hardware_input_type_t_digital');
      }
      return [];
    }
    else if (item === 'LOGICAL_INPUTS_HARDWARE_INPUTS') {
      // Collect all hardware inputs that are not defined as "unused"
      let schema = this.TX.getSchema();
      let count = schema.HARDWARE_INPUTS.c;
      let size = schema.HARDWARE_INPUTS.s;

      let result = [];
      for (let i = 0; i < count; i++) {
        let o = i * size;
        let pinName = this.TX.getItem('HARDWARE_INPUTS_PCB_INPUT_PIN_NAME', {offset: o});
        let type = this.TX.getItemNumber('HARDWARE_INPUTS_TYPE', {offset: o});
        if (type !== 0) {
          result.push(pinName);
        }
      }
      return result;
    }

    return [];
  }

  //*************************************************************************
  overrideNumberOfChoices(item, offset) {
    if (item === 'LOGICAL_INPUTS_HARDWARE_INPUTS') {

      let current = this.getNumberOfHardwareInputs(offset)

      let type = this.TX.getItemNumber('LOGICAL_INPUTS_TYPE', {offset: offset});
      let positionCount = this.TX.getItem('LOGICAL_INPUTS_POSITION_COUNT', {offset: offset});

      switch (type) {
        case 1:   // Analog
        case 4:   // Momentary switch
          return {max: 1, current: current};

        case 2:   // Switch
          //  2 or 3 position may be one switch or two push-buttons
          if (positionCount < 4) {
            return {max: 2, current: current};
          }
          return {max: positionCount, current: current};

        case 3:   // BCD switch
          return {max: positionCount, current: current};

        case 5:   // Trim
          // Two push-buttons or one analog input
          return {max: 2, current: current};

        default:
          return undefined;
      }
    }
    return undefined;
  }

  //*************************************************************************
  getNumberOfHardwareInputs(offset) {
    if (! this.TX) {
      return 0;
    }

    let schema = this.TX.getSchema();
    let hardwareInputsSize = schema.HARDWARE_INPUTS.s;

    let type = this.TX.getItemNumber('LOGICAL_INPUTS_TYPE', {offset: offset});
    let subType = this.TX.getItemNumber('LOGICAL_INPUTS_SUB_TYPE', {offset: offset});
    let positionCount = this.TX.getItem('LOGICAL_INPUTS_POSITION_COUNT', {offset: offset});
    let firstHardwareInput = this.TX.getItemNumber('LOGICAL_INPUTS_HARDWARE_INPUTS', {offset: offset, index: 0});
    let firstHardwareInputType = this.TX.getItemNumber('HARDWARE_INPUTS_TYPE', {offset: firstHardwareInput * hardwareInputsSize});

    switch (type) {
      case 1:   // Analog
      case 4:   // Momentary switch
        return 1;

      case 2:   // Switch
        if (firstHardwareInputType === 7) {   // Momentary push-button
          if (subType === 1) {  // Up/Down buttons
            return 2;
          }
          return 1;
        }
        //  2 or 3 position are covered by a single hardware input
        if (positionCount < 4) {
          return 1;
        }
        return positionCount;

      case 3:   // BCD switch
        return positionCount;

      case 5:   // Trim
        if (firstHardwareInputType === 7) {   // Momentary push-button
          return 2;
        }
        if ([2, 3].includes(firstHardwareInputType)) {  // Analog, center detent, Analog
          return 1;
        }
        return 0;

      default:
        return 0;
    }
  }

  //*************************************************************************
  isValidHardwareType(type, logicalInputsOffset) {
    let offset = logicalInputsOffset;
    let hardwareInputsSize = this.TX.getSchema().HARDWARE_INPUTS.s;
    let hardwareInputsCount = this.getNumberOfHardwareInputs(offset);
    let firstHardwareInput = this.TX.getItemNumber('LOGICAL_INPUTS_HARDWARE_INPUTS', {offset: offset, index: 0});
    let firstHardwareInputType = this.TX.getItemNumber('HARDWARE_INPUTS_TYPE', {offset: firstHardwareInput * hardwareInputsSize});
    let positionCount = this.TX.getItem('LOGICAL_INPUTS_POSITION_COUNT', {offset: offset});
    let logicalInputType = this.TX.getItemNumber('LOGICAL_INPUTS_TYPE', {offset: offset});

    let validHardwareTypes = [];
    switch (logicalInputType) {
      case 1:   // Analog logical input
        //  Analog, returns to center
        //  Analog, center detent
        //  Analog
        //  Analog, positive only
        validHardwareTypes = [1, 2, 3, 4];
        break;

      case 2:   // Switch logical input
        if (firstHardwareInputType === 7) {
          // Push-button
          validHardwareTypes = [7];
        }
        else if (positionCount === 3) {
          //  On/Off/On switch
          validHardwareTypes = [6];
        }
        else {
          //  On/Off switch
          validHardwareTypes = [5];
        }
        break;

      case 3:   // BCD Switch logical input
        //  On/Off switch
        validHardwareTypes = [5];
        break;

      case 4:   // Momentary Switch logical input
        // Push-button
        validHardwareTypes = [7];
        break;

      case 5:   // Trim logical input
        if (hardwareInputsCount === 1) {
          // Analog, center detent
          // Analog
          validHardwareTypes = [2, 3];
        }
        else {
          // Push-button
          validHardwareTypes = [7];
        }
        break;
    }

    return validHardwareTypes.includes(type);
  }


  onLiveMessage(event) {
    let packet = event.detail;

    if (!this.TX) {
      return;
    }

    if (packet[0] !== this.TX_INFO) {
      return;
    }

    if (packet.length <= 1) {
      return;
    }

    let offset = 1;
    const config = this.TX.getConfig();
    const type = config.TYPES['live_t'];

    while ((offset + 6) <= packet.length) {
      let id = Utils.getUint16(packet, offset);
      let value = Utils.getInt32(packet, offset+2);

      let name = this.TX.typeLookupByNumber(type, id);
      this.live[name] = value;

      offset += 6;
    }
  }


  getLiveValue(item) {
    if (this.live.hasOwnProperty(item)) {
      return this.live[item];
    }

    return null;
  }
}

window['Device'] = new Device();
