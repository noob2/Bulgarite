// module.exports = function (grunt) {
//
//     grunt.loadNpmTasks("grunt-contrib-uglify");
//
//     grunt.initConfig({
//         uglify:{
//             dev:{
//                 files:{
//                     "*.min.js":"app/*.js"
//                 }
//             }
//         }
//
//     });
//
//
// };

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        uglify : {
            yourTask : {
                expand: true,
                src : ['app/**/*.js','!app/bower_components/**/*.js'],

                dest: 'build/',
                ext: '.min.js',
                extDot: 'first'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};