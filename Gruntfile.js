// var mozjpeg = require('imagemin-mozjpeg');

module.exports = function(grunt) {

  var version = Date.now();

  // Configuration
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    pug: {
      compile: {
        cwd: 'views/',
        src: ['*.pug'],
        dest: 'dist/',
        ext: '.html',
        expand: true,
      }
    },

  });

  // Chargement des modules
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.registerTask('default', [
    'pug'
  ]);

};
