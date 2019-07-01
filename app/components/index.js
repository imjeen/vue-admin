let componentMap = {};

const requireFiles = require.context('./', true, /\.((js)|(vue))$/);
const pathKeys = requireFiles.keys().filter(path => !/^\.\/index\.js$/i.test(path));

pathKeys
    .filter(path => !/^\.\/index\.js$/i.test(path))
    .forEach(path => {
        let name = '';
        if (/\.\/\w+\/\w+.vue$/i.test(path)) {
            // 第二次目录下的vue文件
            name = path
                .replace(/^(\.\/)/g, '')
                .replace(/\.vue$/g, '')
                .split('/')
                .join('-');
        } else if (/index\.js$/i.test(path)) {
            // 当前子目录下的index.js 文件
            name = path
                .replace(/^(\.\/)/g, '')
                .replace(/\/index\.js$/g, '')
                .split('/')
                .join('-');
        }
        if (!name) return;

        componentMap[`g-${name}`] = requireFiles(path).default;

        Object.keys(requireFiles(path))
            .filter(key => key !== 'default')
            .forEach(key => {
                componentMap[`g-${name}-${key}`] = requireFiles(path)[key];
            });
    });

// console.log('componentMap', componentMap);

export default {
    install(Vue, options) {
        Object.keys(componentMap).forEach(name => Vue.component(name, componentMap[name]));
    },
};
