"use strict";

app.controller('Main', function ($scope, $window, Posts, Config, $routeParams) {
  $scope.Config = Config;
  $scope.Posts = Posts.query;
  
  Config.make();

  $scope.$on("$routeChangeSuccess", function($currentRoute, $previousRoute) {
      if( $routeParams.postTitle ){
        Posts.getBySlug($routeParams.postTitle, function(data){
          $scope.post = data;

          $window.document.title = $scope.post.title + " - " + $scope.config.title;
        });
      } else {
        $window.document.title = $scope.config.title + " - " + $scope.config.description;

        Posts.getPosts(function(data){
          $scope.posts = data;
        });
      }
  });
});