'use strict';

var angular = require('angular'),
    fs = require('fs'),
    moment = require('camunda-commons-ui/vendor/moment');
require('moment-precise-range-plugin');

var template = fs.readFileSync(__dirname + '/cleanup-dashboard.html', 'utf8');

var controller = ['$scope', '$interval', 'cleanupApi', 'Notifications', function($scope, $interval, cleanupApi, Notifications) {

  var getCleanupExtrInfo = function getCleanupExtrInfo(date) {
    var now = moment();
    var end = moment(date);
    // If due date already passed, it means that cleanup is ongoing
    if(now.diff(end) > 0) {
      return {
        status: 'running',
        relativeDueDate: -1
      };
    } else {
      return {
        status: 'scheduled',
        relativeDueDate: moment(date).preciseDiff(now)
      };
    }
  };

  var updateRelativeDate = function updateRelativeDate() {
    var dueDate = $scope.cleanupJob.dueDate;
    $scope.cleanupJob = angular.extend({}, $scope.cleanupJob, getCleanupExtrInfo(dueDate));
  };

  var getCleanupJob = function getCleanupJob() {
    cleanupApi.getCleanupJob()
      .then(function(res) {
        if($scope.cleanupJob && res.data.dueDate === $scope.cleanupJob.dueDate) {
          return;
        }
        var cleanupExtraInfo = getCleanupExtrInfo(res.data.dueDate);
        $scope.cleanupJob = {
          id: res.data.id,
          status: cleanupExtraInfo.status,
          dueDate: res.data.dueDate,
          relativeDueDate: cleanupExtraInfo.relativeDueDate
        };

        return cleanupApi.getCleanupIncident($scope.cleanupJob.id);

      })
      .then(function(res) {
        $scope.incident = res && res.data;
      });
  };

  var initialize = function initialize() {
    getCleanupJob();
    $interval(getCleanupJob, 10000);
    $interval(updateRelativeDate, 1000);
  };

  initialize();

  $scope.cleanupNow = function cleanupNow() {
    cleanupApi.createCleanupJob()
      .then(function() {
        Notifications.addMessage({
          status: 'Terminated',
          message: 'Cleanup job created successfully.'
        });
        getCleanupJob();
      })
      .catch(function() {
        Notifications.addError({
          status: 'Failed',
          message: 'Cleanup job creation failed.'
        });
      });
  };

}];

module.exports = ['ViewsProvider', function(ViewsProvider) {
  ViewsProvider.registerDefaultView('cockpit.cleanup.dashboard', {
    id : 'cleanup-dashboard',
    label : 'Cleanup Dashboard',
    template : template,
    controller : controller,
    priority : 0
  });
}];
