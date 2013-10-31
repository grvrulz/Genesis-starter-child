'use strict';
module.exports = function(grunt) {

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    // watch for changes and trigger compass, jshint, uglify and livereload
    watch: {
      less: {
        files: ['assets/less/**/*.less'],
        tasks: ['recess']
      },
      js: {
        files: '<%= jshint.all %>',
        tasks: ['jshint', 'uglify']
      },
      livereload: {
        options: { livereload: true },
        files: ['style.css', 'assets/js/*.js', '*.html', '*.php', 'assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}']
      }
    },
    
    //Less & css
    recess: {
      dist: {
        options: {
          compile: true,
          compress: true
        },
        files: {
          'style.css': [
            'assets/less/app.less'
          ]
        }
      }
    },
    
    
    // javascript linting with jshint
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        "force": true
      },
      all: [
        'Gruntfile.js',
        'assets/js/source/**/*.js'
      ]
    },

    // uglify to concat, minify, and make source maps
    uglify: {
      plugins: {
        options: {
          sourceMap: 'assets/js/plugins.js.map',
          sourceMappingURL: 'plugins.js.map',
          sourceMapPrefix: 2
        },
        files: {
          'assets/js/plugins.min.js': [
            'assets/js/source/plugins.js',
            // 'assets/js/vendor/yourplugin/yourplugin.js',
          ]
        }
      },
      main: {
        options: {
          sourceMap: 'assets/js/main.js.map',
          sourceMappingURL: 'main.js.map',
          sourceMapPrefix: 2
        },
        files: {
          'assets/js/main.min.js': [
            'assets/js/source/main.js'
          ]
        }
      }
    },
    
    // deploy via rsync
    deploy: {
        options: {
            src: "./",
            args: ["--verbose"],
            exclude: ['.git*', 'node_modules', '.sass-cache', 'Gruntfile.js', 'package.json', '.DS_Store', 'README.md', 'config.rb', '.jshintrc'],
            recursive: true,
            syncDestIgnoreExcl: true
        },
        staging: {
            options: {
                dest: "~/path/to/theme",
                host: "user@host.com"
            }
        },
        production: {
            options: {
                dest: "~/path/to/theme",
                host: "user@host.com"
            }
        }
    }



    // image optimization
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'assets/images/',
          src: '**/*',
          dest: 'assets/images/'
        }]
      }
    }
    
    

  });

  // register task
  grunt.registerTask('default', ['recess', 'uglify']);

};
