define.amd.jQuery = true;

require.config({
  paths: {
    jquery: 'libs/jquery/jquery-1.7.2',
    backbone: 'libs/backbone/backbone',
    backbone_lib: 'libs/backbone',
    underscore: 'libs/underscore/underscore',
  }
});

require([
  'backbone', 'underscore', 'jquery'
], function(Backbone, _, $) {
  console.log(gapi);
  var config = {
    "description": "Google Taskrevolver app",
    "browserApiKey:": "AIzaSyDobpKrhgDFx7u70dYlYvfR67lVk71bMKQ",
    "clientSecret": "TA8QSkFcEYZ6X1sCsDtawrw-",
    "clientID": "548079423497.apps.googleusercontent.com",
    "JavaScript origins": "http://localhost:3000",
    "blogPost": "http://googleappsdeveloper.blogspot.com/2011/12/using-new-js-library-to-unlock-power-of.html"
  },
  scopes = 'https://www.googleapis.com/auth/tasks',
  list = [
    'pay car bill'
  ];

  console.log(gapi.client);
  gapi.client.setApiKey(config.browserApiKey);
  gapi.auth.authorize({
    client_id: config.clientID,
    scope: scopes,
    immediate: false
  }, authorized);

  function authorized() {
    console.log(arguments);
    gapi.client.load('tasks', 'v1', function() {
      console.log(gapi.client);
      gapi.client.tasks.tasklists.list().execute(function(response) {
        var mytasklist;
        _.each(response.items, function(tasklist) {
          if (tasklist.title === 'Persistent Tasklist') mytasklist = tasklist;
        });

        function searchForTasks(tasklist) {
          _.each(list, function(item) {
            // something goes here

          });

          console.log(tasklist);
        }

        if (!mytasklist) {
          gapi.client.tasks.tasklists.insert({
            title: 'Persistent Tasklist'
          }).execute(function(response) {
            mytasklist = response;
            searchForTasks(mytasklist);
          });
        } else {
          searchForTasks(mytasklist);
        }

      });
    });
  }





});

