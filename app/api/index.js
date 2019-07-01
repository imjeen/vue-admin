import HTTP from './http';

const COMMON = {
    getFunction(options = []) {
        if (options.length < 2) return null;
        let method = options[0],
            url = options[1];
        return function() {
            // params, data, config
            /*
             * fn(params)
             * fn(params, config)
             *
             *  fn(data)
             *  fn(params, data)
             *  fn(params, data, config)
             *
             * fn(config)
             */
            let params = null,
                data = null,
                config = null;

            switch (method.toUpperCase()) {
                case 'GET':
                case 'DELETE':
                case 'HEAD':
                case 'OPTIONS':
                    params = arguments[0];
                    if (arguments.length >= 2) config = arguments[1];
                    config = config || {};
                    config.params = {
                        ...(params || {}),
                        ...(config.params || {}),
                    };
                    return HTTP[method.toLowerCase](url, config);
                case 'POST':
                case 'PUT':
                case 'PATCH':
                    if (arguments.length === 1) data = arguments[0];
                    if (arguments.length >= 2) {
                        params = arguments[0];
                        data = arguments[1]; //TODO
                    }
                    if (arguments.length === 3) config = arguments[2];
                    return HTTP[method.toLowerCase](url, data, config);
                default:
                    if (arguments.length === 1) {
                        config = arguments[0];
                    }
                    return HTTP.request(config);
            }
        };
    },
};

const API = {};
const URL = {};

// -----------------------------------------------------
// 去中心化：
const requireFiles = require.context('./', true, /\.js$/);
requireFiles
    .keys()
    .filter(path => /^(\.\/)[A-Za-z0-9]+\/index\.js$/i.test(path))
    .forEach(path => {
        const dirName = (path.replace('./', '').match(/^[A-Za-z0-9]+/i) || [])[0];
        if (!dirName) return;

        API[dirName] = API[dirName] || {};
        URL[dirName] = URL[dirName] || {};
        // 递归
        function walk(pathData, pathKey = '') {
            let type = Object.prototype.toString.call(pathData),
                key_path = `${pathKey.replace(/^\./, '')}`;
            switch (type) {
                case '[object Object]':
                    Object.keys(pathData).forEach(key => {
                        let data = pathData[key],
                            key_string = pathKey ? `${pathKey}.${key}` : key;
                        key && walk(data, key_string);
                    });
                    break;
                case '[object Array]':
                    let url = pathData[pathData.length - 1];
                    if (pathData.length === 2) url = pathData[1];
                    key_path.split('.').reduce((acc, cur, index, arr) => {
                        // console.log(acc, cur, index);
                        let _path = [acc, cur].join('.');
                        if (index === arr.length - 1) {
                            let fn_string = COMMON.getFunction(pathData).toString();
                            eval(`API.${_path} = ${fn_string}; URL.${_path}= '${url}'`);
                        } else {
                            eval(`API.${_path} = API.${_path} || {}; URL.${_path}= URL.${_path} || {}`);
                        }
                        return _path;
                    });
                    break;
                case '[object Function]':
                    key_path.split('.').reduce((acc, cur, index, arr) => {
                        // console.log(acc, cur, index);
                        let _path = [acc, cur].join('.');
                        if (index === arr.length - 1) {
                            // 未定义 url
                            let fn_string = pathData.toString();
                            eval(`API.${_path} = ${fn_string}; URL.${_path}= ''`);
                        } else {
                            eval(`API.${_path} = API.${_path} || {}; URL.${_path}= URL.${_path} || {}`);
                        }
                        return _path;
                    });
                    break;
                default:
                    console.warn(`it\'s a invalid value for the key path: ${key_path}`);
                    break;
            }
        }

        const api_data = requireFiles(path).default;
        walk(api_data, dirName);
    });

// console.log('API', API);
// console.log('URL', URL);

export default API;
