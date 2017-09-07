'use strict';

var angular = require('angular'),
    cleanupDashboard = require('./dashboard/cleanup-dashboard'),
    cleanupApi = require('./dashboard/services/cleanup-api');

var ngModule = angular.module('cockpit.plugin.cleanup.views', []);

ngModule.config(cleanupDashboard);
ngModule.factory('cleanupApi', cleanupApi);

module.exports = ngModule;
