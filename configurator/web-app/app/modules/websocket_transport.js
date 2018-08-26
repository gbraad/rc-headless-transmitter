'use strict';

var Utils = require('./utils');


class WebsocketTransport {
  constructor() {
    this.ws = undefined;
    this.maxPacketsInTransit = 1;
    this.pending = [];
    this.inTransit = [];
    this.timeout = null;
    this.opening = false;

    this._initPotentialBridges();
  }

  //*************************************************************************
  open() {
    if (this.ws) {
      return;
    }

    this.opening = true;
    this.bridges.index = 0;
    this._openURL(this.bridges.locations[this.bridges.index]);
  }

  //*************************************************************************
  _openURL(url) {
    // Connect to the Websocket of the bridge
    this.ws = new WebSocket(url);
    this.maxPacketsInTransit = 1;

    // Set event handlers
    this.ws.onopen = this._onopen.bind(this);
    this.ws.onmessage = this._onmessage.bind(this);
    this.ws.onclose = this._onclose.bind(this);
    this.ws.onerror = this._onerror.bind(this);

    this.timeout = window.setTimeout(this._ontimeout.bind(this), 1000);

    console.log('Websocket open', this.ws.url);
  }

  //*************************************************************************
  close() {
    this.opening = false;
    if (this.ws) {
      console.log('Websocket close', this.ws.url);
      this.ws.close();
    }
    else {
      console.log('Websocket close (this.ws is false)');
    }
  }

  //*************************************************************************
  send(packet) {
    if (!(packet instanceof Uint8Array)) {
      throw new Error('WS: packet is not of type Uint8Array');
    }

    return new Promise((resolve, reject) => {
      // Check if a write packet with exactly the same offset and length
      // exists in pending[]. If yes remove (and resolve) the earlier write
      // requests before adding the new write packet.
      //
      // This optimization improves performance on slow clients like
      // Smartphones.
      if (packet[0] === Device.CFG_WRITE) {
        for (let i = 0; i < this.pending.length; i++) {
          let request = this.pending[i];

          if (request.packet[0] !== Device.CFG_WRITE) {
            continue;
          }

          // Check length
          if (request.packet.length !== packet.length) {
            continue;
          }

          // Check offset
          if (request.packet[1] !== packet[1]) {
            continue;
          }

          if (request.packet[2] !== packet[2]) {
            continue;
          }

          // CFG_WRITE offset and length match, resolve the old request and
          // remove it from the list of pending requests
          let data = [Device.TX_WRITE_SUCCESSFUL, request.packet[1],
            request.packet[2], request.packet.length - 3];
          request.promise.resolve(data);

          this.pending.splice(i, 1);
          --i;
        }
      }

      this.pending.push({
        packet: packet,
        promise: {resolve: resolve, reject: reject}
      });

      this._sendCfgPacket();
    });
  }

  //*************************************************************************
  _sendCfgPacket() {
    if (this.inTransit.length >= this.maxPacketsInTransit) {
      return;
    }

    if (this.pending.length) {
      let request = this.pending.shift();
      this.inTransit.push(request);
      this.ws.send(Utils.hexlify(request.packet));
    }
  }

  //*************************************************************************
  _packetsMatch(request, response) {

    // Read
    if (response[0] === Device.TX_REQUESTED_DATA  &&  request.packet[0] === Device.CFG_READ) {
      for (let j = 1; j < 3; j++) {
        if (response[j] !== request.packet[j]) {
          return false;
        }
      }
      if ((response.length - 3) !== request.packet[3]) {
        return false;
      }
      return true;
    }

    // Write
    if (response[0] === Device.TX_WRITE_SUCCESSFUL  &&  request.packet[0] === Device.CFG_WRITE) {
      for (let i = 1; i < 3; i++) {
        if (response[i] !== request.packet[i]) {
          return false;
        }
      }
      if ((request.packet.length - 3) !== response[3]) {
        return false;
      }
      return true;
    }

    // Copy
    if (response[0] === Device.TX_COPY_SUCCESSFUL  &&  request.packet[0] === Device.CFG_COPY) {
      for (let i = 1; i < 7; i++) {
        if (response[i] !== request.packet[i]) {
          return false;
        }
      }
      return true;
    }

    return false;
  }

  //*************************************************************************
  _resolvePromises(data) {
    // Handle special Websocket only command that indicates the maximum number
    // of bytes that can be in transit (= packet buffer size in the bridge)
    if (data[0] === Device.WS_MAX_PACKETS_IN_TRANSIT) {
      if (data[1] > 1) {
        this.maxPacketsInTransit = data[1];
      }
      return;
    }

    // Go through all packets in transit
    for (let i = 0; i < this.inTransit.length; i++) {
      let request = this.inTransit[i];

      // Remove packets where we don't expect a particular response
      if (request.packet[0] !== Device.CFG_WRITE  &&  request.packet[0] !== Device.CFG_READ  &&  request.packet[0] !== Device.CFG_COPY) {
        request.promise.resolve(data);
        this.inTransit.splice(i, 1);
        --i;
        continue;
      }

      // Match packets to a specifc response
      if (this._packetsMatch(request, data)) {
        request.promise.resolve(data);
        this.inTransit.splice(i, 1);
        // After the first packet matches, stop looking for further ones
        return;
      }
    }
  }

  //*************************************************************************
  _cancelTimeout() {
    if (! this.timeout) {
      return;
    }

    window.clearTimeout(this.timeout);
    this.timeout = null;
  }

  //*************************************************************************
  _ontimeout() {
    console.log('Websocket timeout', this.ws.url);
    this.timeout = null;
    this.ws.close();
  }

  //*************************************************************************
  _onopen() {
    console.log('Websocket opened', this.ws.url);
    this.opening = false;
    this._cancelTimeout();
    Utils.sendCustomEvent('transport-open');
  }

  //*************************************************************************
  _onerror(e) {
    console.log('Websocket error', this.ws.url);

    if (!this.opening) {
      Utils.sendCustomEvent('transport-error', e);
    }
  }

  //*************************************************************************
  _onclose() {
    console.log('Websocket closed', this.ws.url);

    this._cancelTimeout();
    this.ws = undefined;

    // Go through this.pending[] and this.inTransit[] and reject all promises

    let request = this.inTransit.shift();
    while (request) {
      request.promise.reject('Websocket closed');
      request = this.inTransit.shift();
    }

    request = this.pending.shift();
    while (request) {
      request.promise.reject('Websocket closed');
      request = this.pending.shift();
    }


    if (this.opening  &&  this.bridges.index < (this.bridges.locations.length - 1)) {
      ++this.bridges.index;
      this._openURL(this.bridges.locations[this.bridges.index]);
    }
    else {
      this.opening = false;
      Utils.sendCustomEvent('transport-close');
    }
  }

  //*************************************************************************
  _onmessage(e) {
    // e.data contains received string
    if (!(e.data instanceof Blob)) {
      let data = Utils.unhexlify(e.data);

      // Filter out TX_INFO and TX_FREE_TO_CONNECT, which are sent
      // by the Tx without and request.
      if (data[0] === Device.TX_INFO) {
        Device.onLiveMessage(data);
      }
      else if (data[0] === Device.TX_FREE_TO_CONNECT) {
        DeviceList.transmitterFreeToConnect(data);
      }
      else {
        this._resolvePromises(data);
      }
      this._sendCfgPacket();
      return;
    }


    // Parsing binary websocket data via FileReader is very slow on Chrome.
    // We therefore switched to hex-encoded strings. The binary handling
    // code is still left here for reference.
    let reader = new FileReader();
    let self = this;

    reader.addEventListener('loadend', function () {
      let data = new Uint8Array(reader.result);

      // console.log(Utils.byte2string(data[0]));

      // Filter out TX_INFO and TX_FREE_TO_CONNECT, which are sent
      // by the Tx without and request.
      if (data[0] === Device.TX_INFO) {
        Device.onLiveMessage(data);
      }
      else if (data[0] === Device.TX_FREE_TO_CONNECT) {
        DeviceList.transmitterFreeToConnect(data);
      }
      else {
        self._resolvePromises(data);
      }
      self._sendCfgPacket();
    });

    reader.readAsArrayBuffer(e.data);
  }

  //*************************************************************************
  _initPotentialBridges() {

    // We look for Websocket Bridges on the current host as well as on the
    // fixed IP address 192.168.4.1 (which is the IP address configurator).
    //
    // This way we can either run a bridge on the development computer, or
    // point our Wi-Fi to the configurator after loading the app.
    // Note that the app could be pre-cached already on the device, in which
    // case we can start it even if there is no access to the Internet.
    //
    //
    // Note that we exclude .github.io as potential host, where we host
    // the web-app (it provides HTTPS so we can use a service worker for
    // caching, giving us full off-line support).
    //
    // We add secure (wss) versions in all cases, but insecure (ws) versions
    // only when the page is not served via HTTPS. If we try to access ws://
    // when the configurator runs over https:// get a security exception.

    this.bridges = {
      locations: [],
      index: 0,
    };

    const isHTTPS = (window.location.protocol === 'https:');
    const loc = this.bridges.locations;

    // The preferred location is 192.168.4.1/ws, port 443. This way we can
    // ask the user easily to add a security exception for https://192.168.4.1
    // which will immediately apply for the web-socket.
    //
    // Originally we used port 9707, but Firefox differentiates security
    // exceptions by port number [Chrome does not]
    loc.push('wss://192.168.4.1/ws');

    if (!isHTTPS) {
      loc.push('ws://192.168.4.1:9706/');
    }

    let host = window.location.hostname;
    if (! host.endsWith('.github.io')) {
      loc.push(`ws://${host}:9706/`);
    }
  }
}

// *************************************************************************
// function dumpUint8Array(data) {
//   var result = [];
//   data.forEach(function (byte) {
//     result.push(Utils.byte2string(byte));
//   });

//   var response = result.join(' ');

//   while (response.length < ((32 * 3) + 2)) {
//     response += ' ';
//   }

//   data.forEach(function (byte) {
//     if (byte <= 32  ||  byte > 126) {
//       response += '.';
//     }
//     else {
//       response += String.fromCharCode(byte);
//     }
//   });

//   return response;
// }

window['WebsocketTransport'] = new WebsocketTransport();
