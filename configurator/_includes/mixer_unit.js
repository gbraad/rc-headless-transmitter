(function () {
    'use strict';

    var MixerUnit = function MixerUnit() {
        this.offset = 0;
    };
    window['MixerUnit'] = new MixerUnit();

    //*************************************************************************
    MixerUnit.prototype.init = function (params) {
        this.index = params.index;

        var mixer_units = dev.MODEL.getSchema()['MIXER_UNITS'];
        this.offset = mixer_units.s * this.index;

        var mdl = new MDLHelper('MODEL', this.offset);

        mdl.setTextContent('#app-mixer_unit-src', 'MIXER_UNITS_SRC');
        mdl.setSwitch('#app-mixer_unit-invert_source', 'MIXER_UNITS_INVERT_SOURCE');
        mdl.setTextContent('#app-mixer_unit-dst', 'MIXER_UNITS_DST');
        mdl.setTextContent('#app-mixer_unit-op', 'MIXER_UNITS_OP');
        mdl.setSwitch('#app-mixer_unit-apply_trim', 'MIXER_UNITS_APPLY_TRIM');
        mdl.setTextContent('#app-mixer_unit-curve', 'MIXER_UNITS_CURVE_TYPE');
        mdl.setTextContent('#app-mixer_unit-sw', 'MIXER_UNITS_SW_SW');

        mdl.setDataURL('#app-mixer_unit-curve__edit', ['edit_curve', this.offset]);
        mdl.setDataURL('#app-mixer_unit-sw__edit', ['edit_switch', this.offset]);
        mdl.setDataURL('#app-mixer_unit-src__edit',
            ['select_single', 'MODEL', 'MIXER_UNITS_SRC', this.offset]);
        mdl.setDataURL('#app-mixer_unit-dst__edit',
            ['select_single', 'MODEL', 'MIXER_UNITS_DST', this.offset]);
        mdl.setDataURL('#app-mixer_unit-op__edit',
            ['select_single', 'MODEL', 'MIXER_UNITS_OP', this.offset]);

        Utils.showPage('mixer_unit');
    };
})();
