/**
 * @namespace cam.cockpit.plugin
 */

/**
 * @namespace cam.cockpit.plugin.cleanup
 */
'use strict';

var angular = require('angular'),
    viewsModule = require('./views/main');

module.exports = angular.module('cockpit.plugin.cleanup', [viewsModule.name]);
