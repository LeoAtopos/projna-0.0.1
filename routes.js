exports.setReqUrl = function (app) {
	var user = require('./controllers/user');
	// var project = require('./controllers/project');
	// var path = require('path');

// Get Home page
	app.get('/', function(req, res) {
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

	app.get('/user/myprojects', function(req, res) {
		console.log ('myprojects page send');
    	res.header("Content-Type", "text/html");
		res.sendFile (__dirname+"/public/pages/myprojects.html");
	});

	var plist = {
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
		console.log (plist.length);
		if (!req.session.user) {
			res.json ({status: 'visiter'})
		} else {
			console.log (req.session);
			res.json ({status: 'user', plist: plist});
		}
		// res.json(plist);
	})

	app.get('/project/:pagename', function (req, res) {
		console.log (req.params.pagename);
		res.header("Content-Type", "text/html");
		res.sendFile (__dirname+"/public/pages/"+req.params.pagename+".html");
	})

	app.get('/admin/userCheck', user.admin.userCheck);
}
