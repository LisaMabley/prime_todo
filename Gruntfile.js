module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scripts: {
        files: ['client/client.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        },
      },
    },

    uglify: {
      build: {
        src: 'client/client.js',
        dest: 'server/public/scripts/client.min.js'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s)
  grunt.registerTask('default', ['uglify']);
};
