import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import config from './webpack.build';
import merge from 'webpack-merge';

export default merge(config, {
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerHost: '127.0.0.1',
            analyzerPort: 8888,
            openAnalyzer: true,
            generateStatsFile: true,
        }),
    ],
});
