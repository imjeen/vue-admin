const requireFiles = require.context('./', true, /\.(png|ico|gif|jpe?g)(\?[a-z0-9=]+)?$/);
requireFiles.keys().forEach(path => {
    requireFiles(path);
});
