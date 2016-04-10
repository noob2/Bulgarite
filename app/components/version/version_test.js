'use strict';

describe('bulgarite.version module', function() {
  beforeEach(module('bulgarite.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
