const buildConfig = require('./lib/build-config.js')(process.env.PLATFORM || 'webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode : process.env.NODE_ENV || 'development',

    entry: {
        app: buildConfig.app.scripts.cwd + 'app.tsx'
    },
    output: {
        filename: '[name].min.js',
        path: buildConfig.dist.basePath
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [

            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader"
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },

            // All output '.js' will be compressed and uglified.
            {
                test: /\.js$/,
                include: buildConfig.app.basePath,
                use : [
                    {loader: 'uglify-loader'}
                ]
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    //externals: {
     //   "react": "React",
     //   "react-dom": "ReactDOM"
    //},

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