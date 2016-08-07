'use strict';

var Utils = require('./utils');
var MDLHelper = require('./mdl_helper');
var DatabaseObject = require('./database_object');

var mdl = new MDLHelper('TX');
var transmitters = [];

class TransmitterList {
  constructor() {
    this.list = document.querySelector('#app-transmitter_list-list');
    this.noTransmitter = document.querySelector('#app-transmitter_list-no_transmitter');
    this.container = document.querySelector('#app-transmitter_list-list__container');
    this.template = document.querySelector('#app-transmitter_list-list__template').content;
  }

  //*************************************************************************
  init(params) {
    transmitters = [];

    this.noTransmitter.classList.add('hidden');
    this.list.classList.add('hidden');
    mdl.clearDynamicElements(this.list);

    Database.listEntries(this.databaseCallback.bind(this));

    Utils.showPage('transmitter_list');
  }

  //*************************************************************************
  databaseCallback(cursor) {
    // console.log(cursor)
    if (cursor) {
      let data = cursor.value;
      if (data.schemaName === 'TX') {
        let transmitter = new DatabaseObject(data);
        transmitters.push({
          name: transmitter.getItem('NAME'),
          uuid: data.uuid
        });
      }
      cursor.continue();
    }
    else {
      this.updateTransmitterList();
    }
  }

  //*************************************************************************
  updateTransmitterList() {
    mdl.clearDynamicElements(this.list);

    // Sort transmitters[] by name
    transmitters.sort((a, b) => {
      return (a.name < b.name) ? -1 : 1;
    });

    let t = this.template;
    for (let i = 0; i < transmitters.length; i++) {
      t.querySelector('div').classList.add('can-delete');
      t.querySelector('button.app-tramsmitter_list--edit').setAttribute('data-index', i);
      mdl.setTextContentRaw('.app-tramsmitter_list-list__template-name', transmitters[i].name, t);

      let clone = document.importNode(t, true);
      this.container.appendChild(clone);
    }

    if (transmitters.length !==  0) {
      this.list.classList.remove('hidden');
      this.noTransmitter.classList.add('hidden');
    }
    else {
      this.list.classList.add('hidden');
      this.noTransmitter.classList.remove('hidden');
    }
  }

  //*************************************************************************
  edit(element) {
    let index = element.getAttribute('data-index');
    console.log('TransmitterList.edit()', index)

    Database.getEntry(transmitters[index].uuid, function (data) {
      Device.TX = new DatabaseObject(data);
      location.hash = Utils.buildURL(['transmitter_details']);
    });
  }

  //*************************************************************************
  back() {
    history.back();
  }
}

window['TransmitterList'] = new TransmitterList();
