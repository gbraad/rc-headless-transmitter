'use strict';

var Utils       = require('./utils');
var MDLHelper   = require('./mdl_helper');

class Mixer {
  constructor () {
    this.template = document.querySelector('#app-mixer-template').content;
    this.mixer_list = document.querySelector('#app-mixer-list tbody');
  }

  //*************************************************************************
  init (params) {
    let mdl = new MDLHelper('MODEL');
    let model = Device.MODEL;
    let mixer_units = model.getSchema()['MIXER_UNITS'];

    // Empty the list of mixers
    mdl.clearDynamicElements(this.mixer_list);

    for (let i = 0; i < mixer_units.c; i++) {
      let offset = i * mixer_units.s;
      let src = model.getItem('MIXER_UNITS_SRC', {offset: offset});

      // End-of-list is indicated by the mixer unit source being 0
      if (src === 0) {
        break;
      }

      mdl.offset = offset;
      let curve_type = model.getItem('MIXER_UNITS_CURVE_TYPE', {offset: offset});
      let op = model.getItem('MIXER_UNITS_OP', {offset: offset});
      let curve = curve_type + ' ' + op;
      let dst = model.getItem('MIXER_UNITS_DST', {offset: offset});

      let t = this.template;
      t.querySelector('tr').classList.add('can-delete');
      mdl.setTextContent('.app-mixer-template-src', 'MIXER_UNITS_SRC', t);
      mdl.setTextContent('.app-mixer-template-dst', 'MIXER_UNITS_DST', t);
      mdl.setTextContentRaw('.app-mixer-template-mixer_unit', curve, t);
      mdl.setDataURL('.app-mixer-template-mixer_unit', ['mixer_unit', i], t);
      mdl.setDataURL('.app-mixer-template-dst', ['limits', dst], t);

      let clone = document.importNode(t, true);
      this.mixer_list.appendChild(clone);
    }

    Utils.showPage('mixer');
  }

  //*************************************************************************
  back (params) {
    history.back();
  }
}

  window['Mixer'] = new Mixer();
