import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin';
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
        filename: `static/js/${commonConfig.is_release ? '[name]_[contenthash].js' : '[name].js?[contenthash]'}`,
        chunkFilename: `static/js/${commonConfig.is_release ? '[name]_[contenthash].js' : '[name].js?[contenthash]'}`, // just for the require.ensure
    },

    plugins: [
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require(path.resolve(__dirname, `../public/dll/vendor.json`)),
        }),
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require(path.resolve(__dirname, `../public/dll/svg.json`)),
        }),
        new HtmlWebpackPlugin({
            title: '',
            template: path.resolve(__dirname, '../app/index.template.html'),
            filename: 'index.html',
            inject: false,
            // favicon: path.resolve(__dirname, '../favicon.ico'),
        }),
        new AddAssetHtmlPlugin({
            // hash: true,
            publicPath: 'dll/',
            outputPath: 'dll/',
            filepath: path.resolve(__dirname, '../public/dll/*.dll.js'),
        }),
    ],
});
