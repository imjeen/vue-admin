import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.base';
// import commonConfig from './common';

const vendor_dll = ['babel-polyfill', 'es6-promise', 'vue', 'vue-router', 'vuex', 'vuex-router-sync', 'axios', 'vee-validate'];
const svg_dll = [path.resolve(__dirname, '../app/static/svg')];
export default merge(baseConfig, {
    entry: {
        vendor_dll,
        svg_dll,
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'manifest/[name].js?[hash:8]',
        library: '[name]',
    },
    plugins: [
        new webpack.DllPlugin({
            context: '.',
            name: '[name]',
            path: path.resolve(__dirname, `../dist/manifest/[name].json`),
        }),
    ],
});
