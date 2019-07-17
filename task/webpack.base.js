import path from 'path';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import autoprefixer from 'autoprefixer';
import { VueLoaderPlugin } from 'vue-loader';

import commonConfig from './common';

let plugins = [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            STAGE_ENV: JSON.stringify(commonConfig.stage),
        },
    }),
    new MiniCssExtractPlugin(
        commonConfig.is_release
            ? {
                  filename: 'static/css/[name].[contenthash].css',
                  chunkFilename: 'static/css/[name]_[id].[contenthash].css',
              }
            : {
                  filename: 'static/css/[name].css?v=[contenthash]',
                  chunkFilename: 'static/css/[name].css?v=[contenthash]&id=[id]',
              },
    ),
];

let module = {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
        {
            test: /\.vue$/,
            loader: 'vue-loader',
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.(scss|css)$/,
            use: [
                commonConfig.is_release ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                { loader: 'css-loader', options: { sourceMap: false } },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [autoprefixer('last 2 version')],
                        sourceMap: false,
                    },
                },
                { loader: 'sass-loader', options: { sourceMap: false } },
            ],
        },
        {
            test: /\.svg$/,
            use: [
                {
                    loader: 'svg-sprite-loader',
                    options: {
                        // extract: true,
                        // spriteFilename: '',
                        symbolId: '[name]_[hash]',
                        // spriteModule: 'svg-sprite-loader/runtime/browser-sprite.build',
                    },
                },
            ],
        },
        {
            test: /\.mp4(\?[a-z0-9=]+)?$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]?[hash:8]',
                        outputPath(url, resourcePath, context) {
                            let result_url = `${url.replace(/^(app\/)/, '')}`;
                            return result_url;
                        },
                    },
                },
            ],
        },
        {
            test: /\.(png|ico|gif|jpe?g)(\?[a-z0-9=]+)?$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]?[hash:8]',
                        outputPath(url, resourcePath, context) {
                            let result_url = `${url.replace(/^(app\/)/, '')}`;
                            return result_url;
                        },
                    },
                },
                /* {
                loader: 'url-loader',
                options: {
                    limit: 100, // kb
                },
            }, */
            ],
        },
    ],
};

export default {
    mode: commonConfig.mode,
    devtool: 'source-map',
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.js',
            '@app': path.resolve(__dirname, './../app'),
            '@static': path.resolve(__dirname, './../app/static'),
        },
        extensions: ['.js', '.json', '.vue'],
    },
    plugins,
    module,
};
