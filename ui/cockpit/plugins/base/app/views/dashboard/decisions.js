'use strict';

var fs = require('fs');

var template = fs.readFileSync(__dirname + '/decisions.html', 'utf8');

module.exports = [
  'ViewsProvider',
function (
  ViewsProvider
) {
  ViewsProvider.registerDefaultView('cockpit.dashboard', {
    id: 'decisions',
    label: 'Decisions',
    template: template,
    controller: [
      '$scope',
      'camAPI',
    function(
      $scope,
      camAPI
    ) {
      $scope.count = 0;
      $scope.loadingState = 'LOADING';
      var service = camAPI.resource('decision-definition');
      service.count(function (err, count) {
        if (err) {
          $scope.loadingState = 'ERROR';
          throw err;
        }
        $scope.loadingState = 'LOADED';
        $scope.count = count || 0;
      });
    }],

    priority: 0
  });
}];