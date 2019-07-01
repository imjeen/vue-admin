let watching = (process.argv || []).some(key => ['-w', '--watch'].indexOf(key) > -1);

let result = {
    watching,
    static_path: '../dist/',
    mode: 'production',
    stage: 'production', //  web所在阶段：开发，测试，生产等状态。区别于process.env.NODE_ENV (被其他用途占用)
    is_release: !watching,
};

switch (process.env.DEPLOY_ENV) {
    case 'local':
        result = {
            ...result,
            mode: 'development',
            stage: 'test',
        };
        break;
    case 'test':
    case 'pre':
        result = {
            ...result,
            mode: watching ? 'development' : 'production',
            stage: 'test', // same as: pre
        };
        break;
    default:
        result = {
            ...result,
            mode: 'production',
            stage: 'production',
        };
}

export default result;
