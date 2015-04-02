/*jshint expr: true*/
describe('eha.vaccine-versions.service', function() {
  'use strict';
  /*
  This is a PUBLIC REPO
  Do NOT copy test data from test/prod DB's
  Make up your own personal details for test data
  */
  var service;
  var docVersions;

  beforeEach(module('eha.vaccine-versions.service'));
  beforeEach(inject(function(_ehaVaccineVersionsService_) {
    service = _ehaVaccineVersionsService_;

    docVersions = {
      'undefined': {
        firstName: 'test',
        lastName: 'testSon',
        cdcId: 'KBU-111222',
        _id: 'KBU-111222',
        site: 'KBU',
        photograph: {
          mimeType: 'image/jpeg',
          data: 'thing...'
        },
        paymentPhoneNumber: '1112222',
        enrollmentDate: new Date().toJSON()
      },
      '1.0.2': {
        firstName: 'test',
        lastName: 'testSon',
        cdcId: 'KBU-111222',
        _id: 'KBU-111222',
        enrollmentSite: 'KBU',
        photograph: {
          mimeType: 'image/jpeg',
          data: 'thing...'
        },
        paymentPhoneNumber: '1112222',
        enrollmentDate: new Date().toJSON(),
        version: '1.0.2'
      }
    };
  }));

  describe('Conversion Service', function() {
    it('should expose a method', function() {
      expect(service).to.be.a('Function');
    });

    it('should define a current version', function() {
      expect(service.current).to.equal('1.0.2');
    });

    it('should convert a doc with \'undefined\' versions', function() {
      var converted = service(docVersions['undefined']);

      expect(converted.enrollmentSite).to.equal('KBU');
      expect(converted.site).to.be.undefined;
      expect(converted.version).to.equal(service.current);
    });

    it('should not convert a doc of current version', function() {
      var doc = docVersions['1.0.2'];
      var before = JSON.stringify(doc);
      var after = service(doc);

      expect(JSON.stringify(after)).to.equal(before);
    });

    it('should throw error when seeing a doc of unknown version', function() {
      var weird = {
        'version': '11.10.1',
        'ahaddaBadda': 666
      };
      expect(function() { service(weird); }).to.throw(Error);
    });
  });

});
