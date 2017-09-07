'use strict';

module.exports = ['$http','Uri', function($http, Uri) {
  var getCleanupJob = function getCleanupJob() {
    return $http.get(Uri.appUri('engine://engine/:engine/history/cleanup-job'));
  };

  var getCleanupIncident = function getCleanupIncident(jobId) {
    return $http({
      url: Uri.appUri('engine://engine/:engine/incident'),
      method: 'GET',
      params: {configuration: jobId}
    });
  };

  var createCleanupJob = function createCleanupJob() {
    return $http({
      url: Uri.appUri('engine://engine/:engine/history/cleanup'),
      method: 'POST',
      data: {executeAtOnce: true}
    });
  };

  return {
    getCleanupJob: getCleanupJob,
    getCleanupIncident: getCleanupIncident,
    createCleanupJob: createCleanupJob
  };

}];
