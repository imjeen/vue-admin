import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

let messages = {
    tw: {},
    zh: {},
    en: {},
};

const requireFiles = require.context('./', true, /\.json$/);
requireFiles.keys().forEach(path => {
    const lang = (path.replace('./', '').match(/^[A-Za-z0-9_]+/i) || [])[0],
        fileName = (path.match(/[A-Za-z0-9_]+\.json$/i) || [])[0].replace('.json', ''),
        paths = path
            .replace(`./${lang}`, '')
            .replace(`${''}.json`, '')
            .split('/')
            .filter(i => i);
    const i18n_json_data = requireFiles(path);
    paths.length > 0 &&
        paths.reduce((acc, cur) => {
            let key = [acc, cur].filter(i => i).join('.');
            if (fileName !== cur) {
                eval(`messages.${key} = {}`);
                return key;
            }
            eval(`messages.${key} = i18n_json_data`);
            // console.log(messages, i18n_json_data);
            return key;
        }, lang);
});

// console.log(`messages=> `, messages, JSON.stringify(messages, null, 2));

export function createI18n() {
    return new VueI18n({
        locale: 'zh',
        fallbackLocale: 'zh',
        messages,
    });
}

export const lang_list = [
    {
        key: 'en',
        title: 'En',
    },
    {
        key: 'zh',
        title: '简体中文',
    },
    {
        key: 'tw',
        title: '繁體中文',
    },
];
