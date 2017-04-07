angular.module('mainController', ['ngMaterial', 'authServices', 'fileModelDirective', 'uploadFileService', 'userServices', 'profileControllers', 'resetControllers'])



.controller('mainCtrl', function (Auth, $timeout, $location, $rootScope, $scope, uploadFile, DisplayAllData) {

//Display all data's from database
(function() {
	
			DisplayAllData.displayAllInfo().then(function mySucces(response, data, status, headers, config) {
			        $scope.showDatas = response.data;

			       
			       
			    }, function myError(response) {
			        $scope.showDatas = response.statusText;
			    });



})();







	var $this = this;
	$this.loadme = false; // Fix flicker while refresh page
			$rootScope.$on('$stateChangeStart', function(){

					  if(Auth.isLoggedIn())
							{
								//console.log("user logged in ....");
								$this.isLoggedIn = true; // to show logout button and hide login 
								Auth.getUser().then(function(data, status, headers, config){
									$scope.mydata = data;
									$scope.userID = data.data._id
									console.log($scope.userID )
									$this.username = data.data.username;
									////$this.email = data.data.email;
									//$this.id = data.data._id;

									$this.loadme = true; // Fix flicker while refresh page

								});
							}
							else{
								//console.log("user logged failed ....");
								$this.isLoggedIn = false; // To hide Log out button
								$this.username = "";
								$this.username = '';
								$this.loadme = true; // Fix flicker while refresh page
							}

			});
















 $scope.file = {};
    $scope.message = false;
    $scope.alert = '';
    $scope.default = 'https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg';

    $scope.Submit = function() {
        $scope.uploading = true;
        uploadFile.upload($scope.file).then(function(data) {
            if (data.data.success) {
                $scope.uploading = false;
                $scope.alert = 'alert alert-success';
                $scope.message = data.data.message;
                $scope.file = {};
            } else {
                $scope.uploading = false;
                $scope.alert = 'alert alert-danger';
                $scope.message = data.data.message;
                $scope.file = {};
            }
        });
    };

    $scope.photoChanged = function(files) {
        if (files.length > 0 && files[0].name.match(/\.(png|jpeg|jpg)$/)) {
            $scope.uploading = true;
            var file = files[0];
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function(e) {
                $timeout(function() {
                    $scope.thumbnail = {};
                    $scope.thumbnail.dataUrl = e.target.result;
                    $scope.uploading = false;
                    $scope.message = false;
                });
            };
        } else {
            $scope.thumbnail = {};
            $scope.message = false;
        }
    };






	










	//===================================================================================================================
	this.doLogin = function(loginData){ // Getting input data as object Object eg- {name: "BALA", companyname: "mindtree"}
		$this.loading = true;
		$this.errorMsg = false;
		Auth.login($this.loginData).then(function(data){ // sending $this.loginData to factory userServices.js 

			//console.log(data.data.message);// Getting messages user.js
			//console.log(data.data.success); // Getting true or false value from user.js
			
			
			if(data.data.success){
				$this.loading = false;
				$this.successMsg = data.data.message + '........Redirecting to login page';
				$timeout(function() {
					$location.path('/myprofile');
					$this.loginData = '';
					$this.successMsg = '';
					//console.log("Login Successful...")
				}, 2000);
			}else{
				$this.errorMsg = data.data.message;
				$this.loading = false;
			}
			
		}); // PASS INPUT DATA TO BACK END API(USER.JS)

	//console.log(this.loginData)
	};
	//=====================================================================================================================
//Function for Logout (call Auth.logOut() function authServices.js to remove token from localstorage)======================
	this.doLogout = function(){
		Auth.logOut();
		$location.path('/logout');
		$timeout(function() {
			$location.path('/home')
		}, 2000);
	}







});
