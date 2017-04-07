angular.module('userControllers', ['userServices'])// dependenci from userServices.js file 
.controller('regCtrl', function ($http , $location, $timeout , signUp) {
var $this = this;
this.regUser = function(regData){ // Getting input data as object Object eg- {name: "BALA", companyname: "mindtree"}
	$this.loading = true;
	$this.errorMsg = false;
	signUp.SignupFunc($this.regData).then(function(data, status, headers, config){//Params - data, status, headers, config // sending $this.regData to factory userServices.js 

		//console.log(data.data.message);// Getting messages user.js
		//console.log(data.data.success); // Getting true or false value from user.js
		
		
		if(data.data.success){
			//console.log(data); get an whole object
			//console.log(data.headers()); 
			//console.log(data.config.headers); 
			$this.loading = false;
			$this.successMsg = data.data.message + '........Redirecting to login page';
			$timeout(function() {
				$location.path('/login');
			}, 2000);
		}else{
			$this.errorMsg = data.data.message;
			$this.loading = false;
		}
		
	}); // PASS INPUT DATA TO BACK END API(USER.JS)

//console.log(this.regData)
}
//console.log("reg ctrl applying.....");
});