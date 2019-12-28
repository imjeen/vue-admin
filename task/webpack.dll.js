import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.base';
// import commonConfig from './common';

export default merge(baseConfig, {
    entry: {
        /* prettier-ignore */
        vendor: [
            'babel-polyfill', 
            'es6-promise', 
            'vue', 
            'vue-router',
            'vuex',
            'vuex-router-sync',
            'axios', 
            'vee-validate',
        ],
        svg: [path.resolve(__dirname, '../app/static/svg')],
    },
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'dll/[name]_[chunkhash].dll.js',
        library: '[name]_[chunkhash]',
    },
    plugins: [
        new webpack.DllPlugin({
            context: '.',
            name: '[name]_[chunkhash]',
            path: path.resolve(__dirname, `../public/dll/[name].json`),
        }),
    ],
});
