module.exports = function (grunt) {

    grunt.initConfig({

        uglify: {

            inSingleFile: {

                files: {
                    'build/app/app.min.js': ['app/**/*.js', '!app/bower_components/**/*.js']
                }
            },
            inMultipleFiles: {

                expand: true,
                src: ['app/**/*.js', '!app/bower_components/**/*.js'],
                dest: 'build/',
                ext: '.min.js',
                extDot: 'first'
            }
        },

        htmlmin: {

            inMultipleFiles: {

                options: {

                    removeComments: true,
                    collapseWhitespace: true
                },
                expand: true,
                src: ['app/**/*.html', '!app/bower_components/**/*.html'],
                dest: 'build/',
                ext: '.html',
                extDot: 'first'
            },

            indexHTML: {

                files: {
                    'build/index.html': 'index.html'// 'destination': 'source'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('uglify js + html', ['uglify', 'htmlmin']);
};