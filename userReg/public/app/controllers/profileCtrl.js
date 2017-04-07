angular.module('profileControllers', ['userServices'])// dependenci from userServices.js file 
.controller('profileCtrl', function ($http, $scope , PassAllData, Auth) {
console.log($scope.userID);

Auth.getUser().then(function(data){

	console.log(data)
})


	$scope.saveProfile = function(profileData){
		console.log("triggered")
		//console.log(profileData);
		//console.log($scope.userID)

		 var userObject = {}; // Create a user object to pass to function
		 	userObject.data = profileData; // Set the new name to the user
            userObject._id = $scope.userID; // Get _id to search database
            
            console.log(userObject)
		PassAllData.passAllInfo(userObject);
	};


//console.log("profile ctrl applying.....");
});


