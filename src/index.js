;(function() {

  var ngModule = angular.module('eha.vaccine-versions', [
    'eha.vaccine-versions.service'
  ]);

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }

})();
