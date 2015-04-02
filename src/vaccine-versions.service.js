;(function() {
  'use strict';
  /**
   * @ngdoc service
   * @function
   * @name ehaVaccineVersionsService
   * @module eha.vaccine-versions
   */
  var ngModule = angular
                  .module('eha.vaccine-versions.service', []);

  ngModule.factory('ehaVaccineVersionsService', function() {
    var converters = {
      '1.0.2': function(doc) {
        if (!doc.enrollmentSite) {
          doc.enrollmentSite = doc.site;
        }
        delete doc.site;
        doc.version = '1.0.2';

        return doc;
      }
    };

    var versions = Object.keys(converters).sort();
    var current = versions[versions.length - 1];

    function apply(versions, doc) {
      return versions.reduce(function(doc, version) {
        return converters[version](doc);
      }, doc);
    }

    function upgrade(doc) {
      if (doc.version === current) {
        return doc;
      }

      if (!doc.version) {
        return apply(versions, doc);
      }

      var start = versions.indexOf(doc.version);
      // Don't convert unknown versions, for example
      // if the app is out of date
      if (start == -1) {
        throw new Error('This doc comes from a newer version' +
            ' of the app, please upgrade');
      }

      var upgradePath = versions.slice(start + 1);
      return apply(upgradePath, doc);
    }

    upgrade.current = current;

    return upgrade;
  });

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }

})();
