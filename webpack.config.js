const buildConfig = require('./lib/build-config.js')(process.env.PLATFORM || 'webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode : process.env.NODE_ENV || 'development',
    entry: {
        app: buildConfig.app.scripts.cwd + 'app.jsx'
    },
    output: {
        filename: '[name].min.js',
        path: buildConfig.dist.basePath
    },
    module: {
        rules: [{
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                include: buildConfig.app.basePath,
                use : [
                    {loader: 'babel-loader'},
                    {loader: 'uglify-loader'}
                ]
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false,
                }
            }
        })
    ]
};