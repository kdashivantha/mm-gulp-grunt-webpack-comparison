const path = require('path');

module.exports = function (platformName) {
    // Root paths
    const appBasePath = path.resolve(__dirname, '../app') + '/',
        distBasePath = path.resolve(__dirname, '../.dist/' + platformName) + '/',
        nodeModulesBasePath = path.resolve(__dirname, '../node_modules') + '/';

    // Config
    const buildConfig = {
        'dependencies': {
            'jquery': {
                'scripts': {
                    'cwd': nodeModulesBasePath + 'jquery/dist/',
                    'files': [
                        nodeModulesBasePath + 'jquery/dist/jquery.min.js'
                    ]
                }
            },
            'bootstrap': {
                'scripts': {
                    'cwd': nodeModulesBasePath + 'bootstrap-sass/assets/javascripts/',
                    'files':
                    [
                        nodeModulesBasePath + 'bootstrap-sass/assets/javascripts/bootstrap.min.js'
                    ]
                },
                'fonts': {
                    'cwd': nodeModulesBasePath + 'bootstrap-sass/assets/fonts/',
                    'files':
                    [
                        '**/**.*'
                    ]
                }
            }
        },
        'app': {
            'basePath': appBasePath,
            'fonts': {
                'cwd': appBasePath + 'fonts/',
                'files': [
                    '**.*'
                ]
            },
            'images': {
                'cwd': appBasePath + 'images/',
                'files': [
                    '**/*.{jpg,gif,png}'
                ]
            },
            'scripts': {
                'cwd': appBasePath + 'scripts/',
                'files': [
                    appBasePath + 'scripts/**/*.js*'
                ],
                'file': appBasePath + 'scripts/app.jsx'
            },
            'styles': {
                'cwd': appBasePath + 'styles/',
                'watch': '**/*.{css,sass,scss}',
                'files': appBasePath + 'styles/app.scss'
            },
            'html': {
                'cwd': appBasePath,
                'files': [
                    '**/*.{html,htm}'
                ]
            }
        },
        'dist': {
            'basePath': distBasePath,
            'fonts': distBasePath + 'fonts/',
            'images': distBasePath + 'images/',
            'scripts': distBasePath + 'app.min.js',
            'styles': distBasePath + 'app.min.css',
            'html': distBasePath
        }
    };

    buildConfig.build = {
        babel: [].concat(
            buildConfig.dependencies.jquery.scripts.files,
            buildConfig.dependencies.bootstrap.scripts.files,
            buildConfig.app.scripts.files
        )
    };

    return buildConfig;
};