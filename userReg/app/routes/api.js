var User           = require('../models/user');
//after authenticate success install jwr for session
var jwt            = require('jsonwebtoken');
var secret 		   = 'bala';

// mongojs for display all data==============================================================================
var mongojs = require('mongojs')	//============================npm for get, modify, delet data============
var db = mongojs('mongodb://localhost:27017/tutorial', ['users']);

module.exports = function(router) {

//========================Get all collections(data ) from database ===============================
		router.get('/allInformations', function (req, res, next) {
			console.log('I received a GET request');

			db.users.find(function (err, docs) {	//users is table name in database
				console.log(docs);
				res.json(docs);
			});
		});
	//========================USER REGISTRATION ROUTE ===============================
router.put('/updateDetails', function (req, res) {
		
			var myid = req.body._id;
  				console.log(req.body);
var user = new User();
			user.name = req.body.name;
			user.companyname = req.body.companyname;
			user.companyemail = req.body.companyemail;
			user.mobile = req.body.mobile;
  			if(req.body.name == null || req.body.companyname == null || req.body.companyemail == null || req.body.mobile == null){

				res.json({success:false, message:'check...'});

			}else{

				
			}
});	

	//========================http://localhost:8080/api/users ===============================
		router.post('/users', function(req, res){
			console.log(req.body)
			var user = new User();
			user.username = req.body.username;
			user.password = req.body.password;
			user.email = req.body.email;

			if(req.body.username == null || req.body.password == null || req.body.email == null){

				res.json({success:false, message:'Please Check Your Input Details...'});

			}else{

					user.save(function(err){
				if(err){
					res.json({success:false, message:'Username or Email Already Exists..'});
				}
				else{
					res.json({success:true, message:'Thanks for Register with HeNz...'});
				}
			});
			}
		});

	//========================USER LOGIN ROUTE===============================
	//============================http://localhost:8080/api/authenticate===================
	router.post('/authenticate', function(req, res){
		//res.send("testing babblu....") //check in postman by using http://localhost:8080/api/authenticate

		User.findOne({username: req.body.username}).select('email username password').exec(function(err, user){
			if(err) throw err;

			if(!user){
				res.json({success:false, message:'Could Not Authenticate user'})
			}else if(user){

				if(req.body.password){
					var validPassword = user.comparePassword(req.body.password); //comparePassword is custom function in user.js file
				}else{
					res.json({success:false, message:'Provide your password..'});	
				}

				

				if(!validPassword){
					res.json({success:false, message:'Could Not Authenticate password'});
				}else  {
					var token = jwt.sign({username:user.username, email:user.email, _id:user._id}, secret, {expiresIn:'10m'});
					console.log(token)
					res.json({success:true, message:'User authendicated!', token:token});
				}

				
			}
		});
	});
	
	
	//========================Middleware function===============================
	router.use(function(req, res, next){
		var getToken = req.body.token || req.body.query || req.headers['x-access-token'];
		if(getToken){
			//get the token and verify with secret 
			jwt.verify(getToken, secret, function(err, decoded){
				if(err){
					res.json({success:false, message:'Token Invalied..'}); //could happen token expiredIn 1hr.
				} else{
					req.decoded = decoded; // req.decoded available in /myprofile api
					next(); //application continue to next route
				}
			});
		}else{
			res.json({success:false, message:'No token Provided...'});
		}
	});

	//========================Router to get current user details to display===============================
	router.post('/myprofile', function(req, res){
		res.send(req.decoded);
	});






	return router; 
}


