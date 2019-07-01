const svgMap = {};

const requireFiles = require.context('./', true, /\.svg$/);

requireFiles.keys().forEach(path => {
    const name = path
        .replace(/^(\.\/)/i, '')
        .replace(/\.svg$/g, '')
        .split('/')
        .join('-');
    if (!name) {
        return;
    }
    svgMap[name] = requireFiles(path).default;
});

export default svgMap;
