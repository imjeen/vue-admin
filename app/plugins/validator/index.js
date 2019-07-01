import Vue from 'vue';

import VeeValidate, { Validator } from 'vee-validate';
import message_en from 'vee-validate/dist/locale/en';
import message_zh from 'vee-validate/dist/locale/zh_CN';
import message_tw from 'vee-validate/dist/locale/zh_TW';

Vue.use(VeeValidate, {
    errorBagName: 'vee_errors',
    fieldsBagName: 'vee_fields',
    delay: 0,
    locale: 'zh', // the default lang
    dictionary: {
        en: message_en,
        zh: message_zh,
        tw: message_tw,
    },
    strict: true,
    enableAutoClasses: false,
    classNames: {
        touched: 'touched', // the control has been blurred
        untouched: 'untouched', // the control hasn't been blurred
        valid: 'valid', // model is valid
        invalid: 'invalid', // model is invalid
        pristine: 'pristine', // control has not been interacted with
        dirty: 'dirty', // control has been interacted with
    },
    inject: false,
});

export default Validator;
