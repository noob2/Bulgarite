require.config({
    paths: {
        'jquery': 'bower_components/jquery/dist/jquery',
        'angular': 'bower_components/angular/angular',
        'coreModule': 'modules/core/coreModule',
        'themeModule': 'modules/theme/themeModule',
        'angular-route': 'bower_components/angular-route/angular-route',
        'article': 'article/article-factory'
    },

    shim: {
        'angular': {
            deps: ['jquery']
        },
        'angular-route':{
            deps:['angular']
        },
        'coreModule': {
            deps: ['angular-route','themeModule']
        },
        'themeModule': {
            deps: ['angular-route']
        },
        'article':{
            deps:['coreModule']
        }
    }
});

require(['coreModule'], function () {
});
console.log(232)