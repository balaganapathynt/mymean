var myApp = angular.module('appRoutes', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        // Home page ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'app/views/pages/home.html',
            //authenticated: false
        })
        .state('myprofile', {
            url: '/myprofile',
            views:{
                '' : { templateUrl: 'app/views/pages/myprofile.html'},
                'columnTwo@myprofile': { 
                    templateUrl: 'app/views/pages/userDetail/userDetails.html',
                    controller:'profileCtrl'
                }
            },
            authenticated:true
        })
        // login page ========================================
        .state('login', {
            url: '/login',
            templateUrl: 'app/views/pages/users/login.html',
            authenticated: false
        })
         .state('signup', {
             url: '/signup',
             templateUrl: 'app/views/pages/users/signup.html',
             controller:'regCtrl',
             controllerAs:'register',
             authenticated: false
         })
         .state('logout', {
            url: '/logout',
            templateUrl: 'app/views/pages/users/logout.html',
            authenticated: false
        })
         .state('resetpassword', {
            url: '/resetpassword',
            templateUrl: 'app/views/pages/users/reset/resetpassword.html',
            controller:'passwordCtrl',
            controllerAs:'password',
            authenticated: false
        })
         .state('resetusername', {
            url: '/resetusername',
            templateUrl: 'app/views/pages/users/reset/resetusername.html',
            controller:'usernameCtrl',
            controllerAs:'username',
            authenticated: false
        })

$urlRouterProvider.otherwise('/');

// Required for no base (remove '#' from address bar)
$locationProvider.html5Mode({ enabled: true, requireBase: false });


})

myApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}])

myApp.run(['$rootScope', 'Auth','$location', '$state', function($rootScope, Auth, $location, $state){

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      //  console.log(toState.authenticated + " " + Auth.isLoggedIn());

        if(toState.authenticated == true){
           // console.log(toState.authenticated + " " + Auth.isLoggedIn() + " from false auth");
                if(!Auth.isLoggedIn()){
                    event.preventDefault();
                    $state.go('home');
                }           

        }else if(toState.authenticated == false){
          // console.log(toState.authenticated + " " + Auth.isLoggedIn() + " from true auth");
                if(Auth.isLoggedIn()){
                    event.preventDefault();
                   $state.go('myprofile');
                }  

        }
    });
}]);
