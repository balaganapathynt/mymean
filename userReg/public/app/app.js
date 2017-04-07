angular.module('myApp', ['appRoutes', 'userControllers' , 'userServices', 'ngAnimate', 'mainController', 'authServices'])

.config(function ($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptors'); // assign token to ther header
})


//A module is a collection of configuration and run blocks which get applied to the application during the bootstrap process.

/*
Configuration blocks - get executed during the provider registrations and configuration phase. Only providers and constants can be injected into configuration blocks. This is to prevent accidental instantiation of services before they have been fully configured.

Run blocks - get executed after the injector is created and are used to kickstart the application. Only instances and constants can be injected into run blocks. This is to prevent further system configuration during application run time.

.config(function(injectables) { // provider-injector
  // This is an example of config block.
  // You can have as many of these as you want.
  // You can only inject Providers (not instances)
  // into config blocks.
}).
.run(function(injectables) { // instance-injector
  // This is an example of a run block.
  // You can have as many of these as you want.
  // You can only inject instances (not Providers)
  // into run blocks
});*/