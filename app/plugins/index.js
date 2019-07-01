// import Vue from 'vue';
import Validator from './validator'; // only for the client-side validation

export function setPluginLang(lang) {
    Validator.localize(lang);
}
