/*global module:false*/
module.exports = function (grunt) {
  grunt.initConfig({
    // tell slurp which version of the JSAPI to get
    // and where to put it
    esri_slurp: {
      options: {
        version: '3.14'
      },
      dev: {
        options: {
          beautify: true
        },
        dest: 'SampleDojoTypeScriptApp/arcgis-js-api/esri'
      }
    },
	
	clean: {
      esri: ['test']
    },

  });

  grunt.loadNpmTasks('grunt-esri-slurp');
  grunt.loadNpmTasks('grunt-contrib-clean');

  //pulls down the esri source
  grunt.registerTask('slurp', ['clean:esri', 'esri_slurp:dev']);

  grunt.registerTask('default', ['clean:esri', 'esri_slurp:dev']);

};
