exports.setReqUrl = function (app) {
	var user = require('./controllers/userController');
	var project = require('./controllers/projectController');

	var multer = require('multer');
	var uploader = multer({dest: 'uploads/', filename: function(req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1]);
	}});
	// var path = require('path');

// Get Home page
	app.get('/', function(req, res) {
		console.log ('home page send');
    	res.header("Content-Type", "text/html");
		res.sendFile (__dirname+"/public/pages/index.html");
	});

	app.get('/:user', function(req, res) {
		console.log ('home page send');
    	res.header("Content-Type", "text/html");
		res.sendFile (__dirname+"/public/pages/index.html");
	});

// users
	app.get('/user/register', user.register);


	app.post('/user/onregister', user.onregister);


	// app.get('/user/login', user.login);

	app.get('/user/login', function(req, res) {
		console.log ('login page send');
    	res.header("Content-Type", "text/html");
		res.sendFile (__dirname+"/public/pages/login.html");
	});

	app.get('/user/signup', function(req, res) {
		console.log ('signup page send');
    	res.header("Content-Type", "text/html");
		res.sendFile (__dirname+"/public/pages/signup.html");
	});


	app.post('/user/onlogin', user.onlogin);


	app.get('/user/logout', user.logout);


	app.get('/user/checkSession', user.checkSession);

	// app.get('/user/myprojects/:email', project.common.myproject);
	app.get('/myprojects/:email', function (req, res) {
		// console.log (req.session);
		req.session.cookie.looking = req.params.email || "";
		// console.log (req.session);
		req.session.save;
		res.header("Content-Type", "text/html");
		res.sendFile (__dirname+"/public/pages/myprojects.html");
	});

	var plistExample = {
		'0': {
			'title': "Seeds",
			'pic': "Pro2-pic.jpg"
		},
		'1': {
			'title': "Book Seeds",
			'pic': "Pro1-pic.jpg"	
		},
		'2': {
			'title': "Grave",
			'pic': "Pro2-pic.jpg"	
		},
		'3': {
			'title': "Grave",
			'pic': "Pro2-pic.jpg"	
		},
		'4': {
			'title': "Grave",
			'pic': "Pro2-pic.jpg"	
		},
		'5': {
			'title': "Grave",
			'pic': "Pro2-pic.jpg"	
		}
	}

	app.get('/user/myprojectList', function (req, res) {
		// console.log (plist.length);
		var status = "";
		var plist = {};
		if (!req.session.user) {
			status = 'visiter';
			// res.json ({status: 'visiter'})
		} else {
			if (req.session.user.email === req.session.cookie.looking) {
				status = 'self';
			}
			else {
				status = 'other';
			}
			plist = plistExample;
			// res.json ({status: 'user', plist: plist});
		}
		res.json({status: status, plist: plist});
	});

	app.get('/user/getprojna', user.getProjna);

/*
	****************************************************************
*/

	app.get('/project/:pagename', function (req, res) {
		console.log (req.params.pagename);
		res.header("Content-Type", "text/html");
		res.sendFile (__dirname+"/public/pages/"+req.params.pagename+"/"+req.params.pagename+".html");
	})

	app.get('/project/load/bookseeds', project.bookseedsController.loadbookseeds);
	app.post('/project/edit/addSeeds', project.bookseedsController.addSeeds);

	app.get('/project/load/epitaph', project.epitaphController.loadepitaph);
	app.post('/project/edit/addEpitaph', project.epitaphController.addEpitaph);

	app.get('/project/load/profile', project.profileController.loadprofile);
	app.post('/project/edit/addProfile', project.profileController.addProfile);

	app.get('/project/loadFeaturePerson/:projectTitle', project.loadFeaturePerson);

//just send those files back without any method, each page needs load their own details with funcs above

	app.get('/project/:pagename/building/:person', function (req, res) {
		console.log (req.params.pagename+"building");
		res.header("Content-Type", "text/html");
		res.sendFile (__dirname+"/public/pages/"+req.params.pagename+"/"+req.params.pagename+"building"+".html");
	});

	app.get('/project/:pagename/build/:person', function (req, res) {
		console.log (req.params.pagename+"build");
		res.header("Content-Type", "text/html");
		res.sendFile (__dirname+"/public/pages/"+req.params.pagename+"/"+req.params.pagename+"build"+".html");
	})

/*
	****************************************************************
*/

	app.get('/admin/userCheck', user.admin.userCheck);
	app.get('/admin/userCreate', user.admin.userCreate);
	
	app.get('/admin/joinProjTest', user.admin.joinProjTest);

	app.get('/wwwwTest', function (req, res) {
		res.json ({status: 'connected!'})
	});

	app.get('/admin/addProject', project.admin.addProject);
	
	app.get('/admin/testProjectData', project.admin.testProjectData);

	app.get('/admin/testBookseedsData', project.admin.testBookseedsData);
	
	app.get('/admin/testWebSession', user.admin.testWebSession);

	app.get('/admin/addProjToMe', user.admin.addProjToMe);

	app.post('/upload/image', uploader.any(), function (req, res) {
		// console.log ("I get something uploaded which is " + req.file + " files' body were " + req.body);
		// console.log (req.session);
		res.redirect('/project/profile/build/'+req.session.user._id);
	});
}
