'use strict';

var Utils = require('./utils');
var MDLHelper = require('./mdl_helper');


class EditSwitch {
  constructor () {
    this.offset = 0;
  }

  //*************************************************************************
  init(params) {
    this.offset = params.offset;

    let mdl = new MDLHelper('MODEL', {offset: this.offset});

    mdl.setTextContent('#app-edit_switch-switch', 'MIXER_UNITS_SW_SW');
    mdl.setDataURL('#app-edit_switch-switch__edit',
      ['select_single', 'MODEL', 'MIXER_UNITS_SW_SW', this.offset]);

    mdl.setTextContent('#app-edit_switch-comparison', 'MIXER_UNITS_SW_CMP');
    mdl.setDataURL('#app-edit_switch-comparison__edit',
      ['select_single', 'MODEL', 'MIXER_UNITS_SW_CMP', this.offset]);

    mdl.setSlider('#app-edit_switch-value', 'MIXER_UNITS_SW_VALUE');

    Utils.showPage('edit_switch');
  }

  //*************************************************************************
  back() {
    history.back();
  }
}

window['EditSwitch'] = new EditSwitch();
