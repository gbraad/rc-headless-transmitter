'use strict';

var Utils       = require('./utils');
var MDLHelper   = require('./mdl_helper');

class Mixer {
  constructor() {
    this.template = document.querySelector('#app-mixer-template').content;
    this.mixerList = document.querySelector('#app-mixer-list');
    this.cardAddMixerUnit = document.querySelector('#app-mixer-add');
    this.menuAddMixerUnit = document.querySelector('#app-mixer-menu');

    // Number of used mixer units
    this.mixerUnitCount = 0;
    // Maximum number of mixer units
    this.mixerUnitMaxCount = 0;

    this.UNDO = undefined;
    this.snackbar = document.querySelector('#app-mixer-snackbar');
  }

  //*************************************************************************
  init(params) {
    let mdl = new MDLHelper('MODEL');
    let model = Device.MODEL;
    let mixer_units = model.getSchema()['MIXER_UNITS'];

    this.mixerUnitMaxCount = mixer_units.c;
    this.mixerUnitSize = mixer_units.s;

    // Empty the list of mixers
    mdl.clearDynamicElements(this.mixerList);

    for (let i = 0; i < this.mixerUnitMaxCount; i++) {
      let offset = i * this.mixerUnitSize;
      let src = model.getItem('MIXER_UNITS_SRC', {offset: offset});

      // End-of-list is indicated by the mixer unit source being 0
      if (src === 0) {
        this.mixerUnitCount = i;
        break;
      }

      mdl.offset = offset;
      let curve_type = model.getItem('MIXER_UNITS_CURVE_TYPE', {offset: offset});
      let op = model.getItem('MIXER_UNITS_OP', {offset: offset});
      let curve = curve_type + ' ' + op;
      let dst = model.getItem('MIXER_UNITS_DST', {offset: offset});

      let t = this.template;
      t.querySelector('section').classList.add('can-delete');
      mdl.setTextContent('.app-mixer-template-src', 'MIXER_UNITS_SRC', t);
      mdl.setTextContent('.app-mixer-template-dst', 'MIXER_UNITS_DST', t);
      mdl.setTextContentRaw('.app-mixer-template-mixer_unit', curve, t);
      mdl.setDataURL('.app-mixer-template-mixer_unit', ['mixer_unit', i], t);
      mdl.setDataURL('.app-mixer-template-dst', ['limits', dst], t);
      mdl.setAttribute('.app-mixer-template-up', 'data-index', i, t);
      mdl.setAttribute('.app-mixer-template-down', 'data-index', i, t);


      let clone = document.importNode(t, true);
      this.mixerList.insertBefore(clone, this.cardAddMixerUnit);
    }

    this.updateUpDownButtonVisibility();

    // Show/hide addMixderUnit card depending on available space
    if (this.mixerUnitCount < this.mixerUnitMaxCount) {
      this.cardAddMixerUnit.classList.remove('hidden');
      this.menuAddMixerUnit.classList.remove('hidden');
    }
    else {
      this.cardAddMixerUnit.classList.add('hidden');
      this.menuAddMixerUnit.classList.add('hidden');
    }

    Utils.showPage('mixer');
  }

  //*************************************************************************
  updateUpDownButtonVisibility() {
    // Enable all but the first up button
    let up = document.querySelectorAll('.app-mixer-template-up');
    for (let i = 0; i < up.length; i++) {
      up[i].disabled = (i === 0);
    }

    // Enable all but the last down button
    let down = document.querySelectorAll('.app-mixer-template-down');
    for (let i = 0; i < down.length; i++) {
      down[i].disabled = (i === (down.length - 1));
    }
  }

  //*************************************************************************
  add(event) {
    Utils.cancelBubble(event);
    let offset = this.mixerUnitCount * this.mixerUnitSize;

    // A mixer is valid if the MIXER_UNITS_SRC field is not 0. We therefore
    // create a mixer by setting the MIXER_UNITS_SRC field to the first
    // available value.
    let type = Device.MODEL.getType('MIXER_UNITS_SRC');
    let typeValues = Device.MODEL.getTypeMembers(type);
    Device.MODEL.setItem('MIXER_UNITS_SRC', typeValues[0], {offset: offset});
    location.hash = Utils.buildURL(['mixer_unit', this.mixerUnitCount]);
  }

  //*************************************************************************
  editMixerUnit(event) {
    Utils.cancelBubble(event);
    location.hash = event.target.getAttribute('data-url');
  }

  //*************************************************************************
  limits(event) {
    Utils.cancelBubble(event);
    location.hash = event.target.getAttribute('data-url');
  }

  //*************************************************************************
  deleteMixerUnit(index) {
    index = parseInt(index);

    this.UNDO = {
      index: index,
      data: Device.MODEL.getItem('MIXER_UNITS', {index: index})
    };

    // Bring all mixer units behind 'index' forward
    for (let i = index; i < this.mixerUnitMaxCount; i++) {
      // The last element gets set to all zeros (= deleted)
      let data = new Uint8Array(this.mixerUnitSize);
      if (i !== (this.mixerUnitMaxCount - 1)) {
        data = Device.MODEL.getItem('MIXER_UNITS', {index: i + 1});
      }
      Device.MODEL.setItem('MIXER_UNITS', data, {index: i});

      let offset = i * this.mixerUnitSize;
      let src = Device.MODEL.getItem('MIXER_UNITS_SRC', {offset: offset});
      if (src === 0) {
        break;
      }
    }

    this.snackbar.classList.remove('hidden');
    let data = {
      message: 'Mixer unit deleted.',
      timeout: 5000,
      actionHandler: this.undoDeleteMixerUnit.bind(this),
      actionText: 'Undo'
    };
    this.snackbar.MaterialSnackbar.showSnackbar(data);
  }

  //*************************************************************************
  undoDeleteMixerUnit() {
    console.log('undoDeleteMixerUnit');
    if (!this.UNDO) {
      return;
    }

    let index = this.UNDO.index;

    // Move units from this.UNDO.index on backwards
    let moveIndex = this.mixerUnitCount - 1;
    while (moveIndex >= index) {
      let data = Device.MODEL.getItem('MIXER_UNITS', {index: moveIndex});
      Device.MODEL.setItem('MIXER_UNITS', data, {index: moveIndex + 1});
      --moveIndex;
    }

    // Put the deleted item back in place
    Device.MODEL.setItem('MIXER_UNITS', this.UNDO.data, {index: index});

    this.snackbar.classList.add('hidden');
    location.hash = Utils.buildURL(['mixer_unit', this.UNDO.index]);
    this.UNDO = undefined;
  }

  //*************************************************************************
  up(event) {
    Utils.cancelBubble(event);

    let element = event.target;
    let mixerUnitIndex = parseInt(element.getAttribute('data-index'));

    // Safety bail-out
    if (mixerUnitIndex < 1) {
      return;
    }

    console.log(`up: mixerUnitIndex=${mixerUnitIndex}`);
    this.swap(mixerUnitIndex, mixerUnitIndex - 1);
  }

  //*************************************************************************
  down(event) {
    Utils.cancelBubble(event);

    let element = event.target;
    let mixerUnitIndex = parseInt(element.getAttribute('data-index'));

    // Safety bail-out
    if (mixerUnitIndex >= (this.mixerUnitCount - 1)) {
      return;
    }

    console.log(`down: mixerUnitIndex=${mixerUnitIndex}`);
    this.swap(mixerUnitIndex, mixerUnitIndex + 1);
  }

  //*************************************************************************
  swap(index1, index2) {
    let model = Device.MODEL;

    let unit1 = model.getItem('MIXER_UNITS', {index: index1});
    let unit2 = model.getItem('MIXER_UNITS', {index: index2});

    model.setItem('MIXER_UNITS', unit2, {index: index1});
    model.setItem('MIXER_UNITS', unit1, {index: index2});

    // FIXME: this could be done smarter than brute-force rebuilding all page
    // elements
    this.init();
  }

  //*************************************************************************
  back(params) {
    history.back();
  }
}

  window['Mixer'] = new Mixer();
