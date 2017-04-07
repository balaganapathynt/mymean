// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var router		   = express.Router();



var appRoutes      = require('./app/routes/api')(router);
var path		   = require('path');//no need to install(buildin package)
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploades/');
    },
    filename: function(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
            var err = new Error();
            err.code = 'filetype';
            return cb(err);
        } else {
            cb(null, file.originalname);

        }
    }
});
var upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }
}).single('myfile');
	

var port = process.env.PORT || 8080; // set our port

// configuration ===========================================
app.use(morgan('dev'));
app.use(bodyParser.json());//for parsing application/json
app.use(bodyParser.urlencoded({extended:true}));//for parsing application/x-www-form-urlencoded

app.use(express.static(__dirname + '/public'));//To serve a static files from public folder(middleware)
app.use('/api',appRoutes);//for backend routs http://localhost:8080/api/users

// Database connection =====================================

mongoose.connect('mongodb://localhost:27017/tutorial', function(err){

	if(err){
		console.log('Not connected to the database...' + err);
	}
	else
	{
		console.log('Succeccfully connected to the database');
	}
});



 
	//========================Router to get current user details to display===============================
app.post('/upload', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                res.json({ success: false, message: 'File size is too large. Max limit is 10MB' });
            } else if (err.code === 'filetype') {
                res.json({ success: false, message: 'Filetype is invalid. Must be .png' });
            } else {
                res.json({ success: false, message: 'Unable to upload file' });
            }
        } else {
            if (!req.file) {
                res.json({ success: false, message: 'No file was selected' });
            } else {
                res.json({ success: true, message: 'File uploaded!' });
            }
        }
    });

     console.log(req.body);
            console.log(req.file);
       
});



app.get('*', function (req, res) {

	res.sendFile(path.join(__dirname + '/public/app/views/index.html')); // same as express.static
});

app.listen(port, function(){
	console.log('Running the server on port..' + port);
});