angular.module('userServices',[])
.factory('signUp', function($http) {
	
		var signupFactory = {};

		signupFactory.SignupFunc = function(regData){

			return $http.post('/api/users' , regData);
		}

		return signupFactory;

})

//=================Factory for display all data from databasr===================
.factory('DisplayAllData', function($http) {
	
		var getAllDataFromDB = {};

		getAllDataFromDB.displayAllInfo = function(){

			return $http.get('/api/allInformations');
		}

		return getAllDataFromDB;

})

//=================Factory for display all data from databasr===================
.factory('PassAllData', function($http) {
	
		var passAllDataToDB = {};

		passAllDataToDB.passAllInfo = function(userObject){

		/*	return $http({
						    url: '/api/updateDetails', userObject, 
						    method: "put",
						   // params: {user_id: myId}
 						});*/

return $http.put('/api/updateDetails', userObject);
			
		}

		return passAllDataToDB;

})

