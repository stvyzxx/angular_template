'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ui.router',
  'oc.lazyLoad',
  'ngMessages',
  'ngAnimate'
]); 


angular.module('myApp').controller('MainCtrl', ['$scope', function($scope) {    

}]);

angular.module('myApp').config(['$locationProvider', '$routeProvider', '$stateProvider', '$ocLazyLoadProvider', function($locationProvider, $routeProvider, $stateProvider, $ocLazyLoadProvider) {
    
    $ocLazyLoadProvider.config({
        // global configs go here
    });
    
    $routeProvider.otherwise({redirectTo: '/view1'});
    
    $stateProvider
    .state('view1', {
            url: "/view1",
            templateUrl: "views/view1/view1.html",            
            controller: "View1Ctrl",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'myApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'views/view1/view1.js'
                        ] 
                    });
                }]
            }
        
        })
    
}]);


/* Init global settings and run the app */
angular.module('myApp').run(["$rootScope", "$state", function($rootScope, $state) {
    
    $rootScope.$state = $state; // state to be accessed from view
    $state.go('view1');
}]);