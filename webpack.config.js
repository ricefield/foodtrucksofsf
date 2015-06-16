module.exports = {
    entry: './react/index.jsx',
    output: {
        path: './foodtrucks/static/',
        filename: 'app.js'
    },
    module: {
        loaders: [
            { test: /\.js|\.jsx$/, loader: 'jsx'},
        ]
    }
};