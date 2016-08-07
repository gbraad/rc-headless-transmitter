'use strict';

var Utils = require('./utils');
var MDLHelper = require('./mdl_helper');
var DatabaseObject = require('./database_object');


var availableTransmitters = [];
var showToast = false;

class DeviceList {
  constructor() {
    this.loading = document.querySelector('#app-device_list-loading');

    this.noWebsocket = document.querySelector('#app-device_list-loading__no-websocket');


    this.list = document.querySelector('#app-device_list-list');
    this.container = document.querySelector('#app-device_list-list__container');
    this.template = document.querySelector('#app-device_list-list__template').content;

    this.txLoading = document.querySelector('#app-device_list-loading_transmitter');
    this.txProgress = document.querySelector('#app-device_list-loading_transmitter__progress');
    this.txConnecting = document.querySelector('#app-device_list-loading_transmitter__connecting');
    this.txModel = document.querySelector('#app-device_list-loading_transmitter__model');
    this.txTransmitter = document.querySelector('#app-device_list-loading_transmitter__transmitter');

    this.mdl = new MDLHelper();
    this.progress = {};

    this._onmessage = this.onmessage.bind(this);
  }

  //*************************************************************************
  init(params) {
    this.resetPage();

    if (Device.connected) {
      Device.disconnect();
    }
    else {
      Device.enableCommunication();
    }

    document.addEventListener('dev-connectionlost', this.connectionlost.bind(this));
    Utils.showPage('device_list');
  }

  //*************************************************************************
  back(params) {
    history.back();
  }

  //*************************************************************************
  resetPage() {
    document.addEventListener('ws-message', this._onmessage);

    this.loading.classList.remove('hidden');
    this.list.classList.add('hidden');
    this.txLoading.classList.add('hidden');
    availableTransmitters = [];

    // Empty the list of transmitters
    this.mdl.clearDynamicElements(this.list);
    this.noWebsocket.classList.add('hidden');
  }

  //*************************************************************************
  transmitterReadyForConnect(data) {
    showToast = true;

    let newTx = {
      name: Utils.uint8array2string(data.slice(9, 16 + 9)),
      uuid: Utils.uuid2string(data.slice(1, 8 + 1))
    };

    let index = availableTransmitters.findIndex((element, index, array) => {
      return element.name === newTx.name;
    });

    if (index >= 0) {
      return;
    }

    availableTransmitters.push(newTx);
    index = availableTransmitters.length - 1;

    console.log('New transmitter: ' + newTx.name);

    this.list.classList.remove('hidden');
    this.loading.classList.add('hidden');

    let t = this.template;
    t.querySelector('div').classList.add('can-delete');
    t.querySelector('button').setAttribute('data-index', index);
    this.mdl.setTextContentRaw('.app-device_list-list__template-name', newTx.name, t);

    let clone = document.importNode(t, true);
    this.container.appendChild(clone);

    showToast = true;
  }

  //*************************************************************************
  edit(index) {
    document.removeEventListener('ws-message', this._onmessage);

    let tx = availableTransmitters[index];

    this.mdl.setTextContentRaw('#app-device_list-loading_transmitter__name', tx.name);

    this.list.classList.add('hidden');
    this.txLoading.classList.remove('hidden');
    this.txProgress.classList.add('mdl-progress--indeterminate');

    this.txConnecting.classList.remove('hidden');
    this.txModel.classList.add('hidden');
    this.txTransmitter.classList.add('hidden');

    this.load(tx.uuid);
  }

  //*************************************************************************
  // connect to the transmitter
  // retrieve configVersion
  // if we don't know this configVersion
  //    send disconnect command
  //    abort (reset the pagge)
  // loadDevice('TX')
  // loadDevice('MODEL')
  load(uuid) {
    var configVersion;

    // FIXME: Retrieve passphrase from database based on UUID, or 1234 if not found, or provided one
    let passphrase = 1234;
    // FIXME: implement progress bar

    Device.connect(uuid, passphrase).then(() => {
      return Device.read(0, 4);
    }).then(data => {
      configVersion = Utils.getUint32(data);
      // console.log(data)
      if (!CONFIG_VERSIONS.hasOwnProperty(configVersion)) {
        return Promise.reject(
          new Error(`Unknown configVersion "${configVersion}"`));
      }
      this.txConnecting.classList.add('hidden');
      this.txTransmitter.classList.remove('hidden');
      return this.loadDevice(configVersion, 'TX');
    }).then(() => {
      this.txTransmitter.classList.add('hidden');
      this.txModel.classList.remove('hidden');
      return this.loadDevice(configVersion, 'MODEL');
    }).then(() => {
      location.hash = Utils.buildURL(['model_details']);
    }).catch(error => {
      console.log(error);
      // FIXME: we should let the user know that something went wrong
      this.resetPage();
    });
  }

  //*************************************************************************
  // load hw.[schemaName].UUID
  // if hw.[schemaName].UUID is not set
  //     generate new UUID
  //     write UUID to hw.[schemaName]
  //     write LAST_CHANGED to hw.[schemaName]
  // if hw.[schemaName].UUID is in our database
  //     load hw.[schemaName].LAST_CHANGED
  //     if hw.[schemaName].LAST_CHANGED == database[UUID].LAST_CHANGED
  //         load Device.[schemaName] from database
  //     else if hw.[schemaName].LAST_CHANGED > database[UUID].LAST_CHANGED
  //         load hw.[schemaName] into Device.[schemaName]
  //         update Device.[schemaName] in database
  //     else
  //         load Device.[schemaName] from database
  //         write Device.[schemaName] to hw.[schemaName]
  // else
  //     load hw.[schemaName] into Device.[schemaName]
  //     add Device.[schemaName] to our database
  loadDevice(configVersion, schemaName) {
    // console.log(`DeviceList.loadDevice configVersion=${configVersion} schemaName=${schemaName}`)

    const schema = CONFIG_VERSIONS[configVersion][schemaName];
    var newDev = {};

    newDev.configVersion = configVersion;
    newDev.schemaName = schemaName;
    newDev.data = new Uint8Array(schema.s);

    return new Promise((resolve, reject) => {
      Device.read(schema.o + schema['UUID'].o, schema['UUID'].c).then(data => {
        // console.log('UUID bytes', data);
        newDev.uuid = Utils.uuid2string(data);
        // console.log('UUID', newDev.uuid);
        if (!Utils.isValidUUID(newDev.uuid)) {
          newDev.uuid = Utils.newUUID();
          return Device.write(schema.o + schema['UUID'].o, schema['UUID'].s,
            Utils.string2uuid(newDev.uuid));
        }
        return Promise.resolve();
      }).then(() => {
        return new Promise((resolve, reject) => {
          Database.getEntry(newDev.uuid, data => {
            if (data) {
              data = new DatabaseObject(data);
            }
            resolve(data);
          });
        });
      }).then(dbEntry => {
        // console.log('dbEntry', dbEntry)
        if (dbEntry  &&  dbEntry.getItem('UUID') === newDev.uuid)  {
          // console.log('Device is in the database already');
          return new Promise((resolve, reject) => {
            Device.read(schema.o + schema['LAST_CHANGED'].o, schema['LAST_CHANGED'].s).then(data => {
              newDev.lastChanged = Utils.getUint32(data);

              // console.log('LAST_CHANGED', newDev.lastChanged, dbEntry.lastChanged)

              if (newDev.lastChanged === dbEntry.lastChanged) {
                // console.log('device === db')
                // console.log(dbEntry)
                resolve(dbEntry);
              }
              else if (newDev.lastChanged > dbEntry.lastChanged) {
                // console.log('device > db')
                this.loadDeviceData(newDev).then(devdbentry => {
                  resolve(devdbentry);
                });
              }
              else {
                // console.log('device < db')
                Device.write(schema.o, dbEntry.data).then(() => {
                  resolve(dbEntry);
                });
              }
            });
          });
        }
        else {
          return this.loadDeviceData(newDev);
        }
      }).then(dbobject => {
        // console.log("RESOLVING read", schemaName)
        Device[newDev.schemaName] = dbobject;
        resolve();
      });
    });
  }

  //*************************************************************************
  // load hw.[newDev.schemaName] into newDev
  // add newDev to our database
  loadDeviceData (newDev) {
    const schema = CONFIG_VERSIONS[newDev.configVersion][newDev.schemaName];
    return new Promise((resolve, reject) => {
      Device.read(schema.o, schema.s).then(data => {
        // console.log('loadDeviceData read from device')
        newDev.data = data;

        var dbEntry = new DatabaseObject(newDev);
        newDev.lastChanged = dbEntry.getItem('LAST_CHANGED');

        return new Promise((resolve, reject) => {
          // console.log('setEntry', newDev)
          Database.setEntry(newDev, () => {
            // console.log('setEntry done')
            resolve(dbEntry);
          });
        });
      }).then(dbobject => {
        // console.log('resolving outer promise', dbobject)
        resolve(dbobject);
      });
    });
  }

  //*************************************************************************
  connectionlost(event) {
    if (Device.MODEL || Device.TX) {
      Device.MODEL = undefined;
      Device.TX = undefined;
      Utils.rollbackHistoryToRoot();
      location.hash = Utils.buildURL(['device_list']);
    }

    showConnectionLostMessage();
    this.resetPage();
    this.noWebsocket.classList.remove('hidden');
  }

  //*************************************************************************
  // Receives Websocket messages
  onmessage (event) {
    // console.log('DeviceList ws: ', event, data);
    let data = event.detail;

    // FIXME: handle situation when we return to that page while already
    // connected to a transmitter
    if (data[0] === Device.TX_FREE_TO_CONNECT) {
      this.transmitterReadyForConnect(data);
    }
  }
}

//*************************************************************************
function showConnectionLostMessage () {
  if (!showToast) {
    return;
  }
  showToast = false;

  // FIXME: the 'toast; should be one element for the whole app!
  let toast = document.querySelector('#app-device_list-toast');
  const message = {
    message: 'Connection lost',
    timeout: 5000
  };
  toast.MaterialSnackbar.showSnackbar(message);
}

window['DeviceList'] = new DeviceList();
