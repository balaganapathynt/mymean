angular.module('resetControllers', [])
.controller('usernameCtrl', function(){
	console.log("R CTRL applying");

	var $this = this;

	$this.resetbyEmail = function(regEmail){

		console.log($this.regEmail)
	}
})

.controller('passwordCtrl', function(){
	console.log(" P CTRL applying");
})