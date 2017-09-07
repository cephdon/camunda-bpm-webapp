'use strict';
module.exports = [ 'ViewsProvider', function(ViewsProvider) {
  ViewsProvider.registerDefaultView('cockpit.navigation', {
    id: 'cleanup',
    label: 'Cleanup',
    pagePath: '#/cleanup',
    checkActive: function(path) {
      return path.indexOf('#/cleanup') > -1;
    },
    template: '<!-- nothing to show, but needed -->',
    controller: function() {},
    priority: -5
  });
}];
