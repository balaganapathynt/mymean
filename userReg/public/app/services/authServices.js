angular.module('authServices', []) //pass authServices to mainCtrl.js file
.factory('Auth', function ($http , AuthToken) {
	var authFactory = {};

	//Pass user username and password to backend====================================================================
	authFactory.login = function(loginData){
		return $http.post('/api/authenticate',loginData).then(function(data){
			//console.log(data.data.token); Receiving token from backend and pass into setToken function
			AuthToken.setToken(data.data.token);
			return data;
		});
	}

	//Auth.isLoggedIn();============================================================================================
	authFactory.isLoggedIn = function(){
		if(AuthToken.getToken()){
			return true;
		}else{
			return false;
		}
	}
	//Auth.getUser();============================================================================================
	authFactory.getUser = function(){
		if(AuthToken.getToken()){
			return $http.post('/api/myprofile');
		}else{
			$q.reject({message:'User has no token..'});
		}
	}
	//Auth.logOut();============================================================================================
	authFactory.logOut = function(){
		AuthToken.setToken(); // For logout set token again so else will be execute from AuthToken.setToken() function
	}

	return authFactory;
})

//=========================================================================================================================
.factory('AuthToken', function($window){   

	var authTokenFactory = {};

	//AuthToken.setToken();============================================================================================
	authTokenFactory.setToken = function(token){
		if(token){
			$window.localStorage.setItem('token', token); // if true store token in localstorage
		}else{
			$window.localStorage.removeItem('token', token); //IF false remove token from localstorage
		}
		
	}

	//AuthToken.getToken();============================================================================================
	authTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token');

	}

	return authTokenFactory;

})

//Assign toke to headers;

.factory('AuthInterceptors', function(AuthToken){
	var authTnterceptorsFactory = {};
	authTnterceptorsFactory.request = function(config){
		//console.log(config.method + " " + config.transformRequest)
		var mytoken = AuthToken.getToken();
		//console.log(mytoken + "------ " + "token")
		if(mytoken) config.headers['x-access-token'] = mytoken;
		return config;
		
	};
	return authTnterceptorsFactory;
})


