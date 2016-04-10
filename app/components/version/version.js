'use strict';

angular.module('bulgarite.version', [
  'bulgarite.version.interpolate-filter',
  'bulgarite.version.version-directive'
])

.value('version', '0.1');
