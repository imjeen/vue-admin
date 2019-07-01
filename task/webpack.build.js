import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import baseConfig from './webpack.base';
import commonConfig from './common';

console.group(`==========================`);
console.log(`${JSON.stringify(commonConfig, null, 2)}`);
console.groupEnd();
console.log(`==========================`);

export default merge(baseConfig, {
    entry: {
        main: path.resolve(__dirname, '../app/main.js'),
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: `static/js/${commonConfig.is_release ? '[name]_[hash].js' : '[name].js?[hash]'}`,
        chunkFilename: `static/js/${commonConfig.is_release ? '[name]_[hash].js' : '[name].js?[hash]'}`, // just for the require.ensure
    },

    plugins: [
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require(path.resolve(__dirname, `../dist/manifest/vendor_dll.json`)),
        }),
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require(path.resolve(__dirname, `../dist/manifest/svg_dll.json`)),
        }),
        new HtmlWebpackPlugin({
            title: '',
            template: path.resolve(__dirname, '../app/index.template.html'),
            filename: 'index.html',
            inject: false,
            // favicon: path.resolve(__dirname, '../favicon.ico'),
        }),
    ],
});
