var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var routes = require('./routes');
var cookieParser = require('cookie-parser');
// var fs= require('fs');
var path = require('path');
var url = require('url');
var bodyParser = require('body-parser');

var projModel = require('./Schemas/projectSchema');
var Proj = projModel.Project;

var model = require('./Schemas/userSchema');
var User = model.User;

var app = express();

// app.use(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, '/public')));


/*
	session 验证
	各参数意义：
	secret：用来对session数据进行加密的字符串.这个属性值为必须指定的属性。
	name：表示cookie的name，默认cookie的name是：connect.sid。
	maxAge：cookie过期时间，毫秒。
	resave：是指每次请求都重新设置session cookie，假设你的cookie是6000毫秒过期，每次请求都会再设置6000毫秒。
	saveUninitialized： 是指无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid。

	之后在处理请求时直接通过以下方式对session进行读写：

	req.session.lastpage = lastPage;//写入至session

	res.redirect(req.session.lastpage);//从session中读取
*/
app.use(cookieParser());
app.use(session({
	secret:'gooze',
  	cookie: {maxAge: 3600000},
 	resave: false,
  	saveUninitialized: true,
}));

app.use(bodyParser());

mongoose.connect('mongodb://localhost/test');

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

routes.setReqUrl(app);

// var headSetter = function () {
// 	var fs = require('fs');
// 	fs.readFile("./public/pages/setTest.html", {encoding:'utf-8'}, function (err, data) {
// 		if (err) {};
// 		console.log (data);
// 		//var newdata = data.replace ("</head>", "<title>Projna</title>\n</head>");
// 		console.log (newdata);
// 		fs.writeFile("./public/pages/setTest.html", newdata, function (err) {
// 			if (err) {};
// 		})
// 	});
// }
// headSetter();

var ADDRESS = '127.0.0.1';
var PORT = 8081;

//get ready for config dbs
//adding profile into projects
Proj.findOne({'title': 'profile'}, function (err, result) {
	if (err) {};
	if (result) {console.log ('project already exist');}
	else {
		var proj = new Proj();
		proj.title = 'profile';
		proj.name = 'Profile';
		proj.pic = 'Pro2-pic';
		proj.order = 1;
		proj.save(function (err, userInfo) {
			if (err) {};
			console.log ("Successed adding project: "+'profile');
		})
	}
});
//find proj bookseeds, creat one if not found
Proj.findOne({'title': 'bookseeds'}, function (err, result) {
	if (err) {};
	if (result) {console.log ('project already exist');}
	else {
		var proj = new Proj();
		proj.title = 'bookseeds';
		proj.name = 'Book Seeds';
		proj.order = 2;
		proj.save(function (err, userInfo) {
			if (err) {};
			console.log ("Successed adding project: "+'epitaph');
		})
	}
});
//find proj epitaph, creat one if not found
Proj.findOne({'title': 'epitaph'}, function (err, result) {
	if (err) {};
	if (result) {console.log ('project already exist');}
	else {
		var proj = new Proj();
		proj.title = 'epitaph';
		proj.name = 'Epitaph';
		proj.pic = 'Pro2-pic';
		proj.order = 3;
		proj.save(function (err, userInfo) {
			if (err) {};
			console.log ("Successed adding project: "+'bookseeds');
		})
	}
});

// user itself should be a project too.how to do that, oh my God.
//find useer, creat one if not found
var user = new User();
User.findOne({}, function (err, result) {
	if (err) {};
	if (result) {console.log ('users exist');}
	else {
		user.email = 'r';
		user.password = '1';
		// user.projects.push (project);
		user.save(function (err, userInfo) {
			if (err) {};
			console.log ("Successed adding users");
		})
	}
})


var server = app.listen(PORT);
console.log ("Running server on :"+PORT);






// ********************** PAST DOCs **********************  \\

// var db = mongoose.connect('mongodb://localhost/test');
// var UserSchema = new mongoose.Schema({
//   username: {type: String},
//   password: {type: String, default: 123456},
//   createDate: {type: Date, default: Date.now},
//   email: {},
//   projects: {}
// });

// // var UserModel = db.model('user', UserSchema);
// var UserModel = mongoose.model('user', UserSchema);

// UserModel.findUser = function () {
//   console.log ("find user");
// }

// var userCtrl = require('./controllers/user');


// // parse application/x-www-form-urlencoded 
// app.use(bodyParser.urlencoded({ extended: false }))
// // parse application/json 
// app.use(bodyParser.json())

// // app.use(express.static('public'));
// app.use(express.static(__dirname + '/public'));



// app.get ('/', function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});  
//   res.end('Hello World\n');
// })

// app.get('/index', function (req, res) {
//    res.sendFile( __dirname + "/public" + "/index.html" );
// })

// app.get('/wangzhao', function (req, res) {
//    res.sendFile( __dirname + "/public" + "/wangzhao.html" );
// })

// app.get('/codeTest', function (req, res) {
//   res.sendFile( __dirname + "/public" + "/codeTest.html" );
// })

// app.get('/pusa', function (req, res) {
//   res.sendFile( __dirname + "/public" + "/pusa.html" );
// })

// app.get('/codeTest/GetMe', function (req, res) {
//   console.log ("Mission Get!");
//   // console.log (req.query['check']);
//   // console.log (req.query['action']);

//   var resData = '';

//   if (req.query['action']=='reg') {
//     console.log("Reg me!");
//     var tdb = {
//       uid: 1,
//       username: req.query['username'],
//       seeds: "123"
//     };
//     console.log(tdb['username']);
//     var uu = new user.User(tdb);
//     uu.create();
//     // console.log (uu.seeds());
//     resData = "You have registed successfully"
//     res.send (resData);
//   };

//   if (req.query['action']=='login') {
//     console.log("Let me in!");
//     console.log("username trying to login is " + req.query['username']);
//     UserModel.find({username: req.query['username']}, function (err, result) {
//       if(err) {
//           console.log(error);          
//       } else {
//           console.log(result);
//           if (result.length === 0) {
//             resData='You are not one of us';
//             res.send (resData);
//           }else {
//             resData='Welcome back '+req.query['username'];
//             res.send (resData);
//           }
//           // res.json(result);
//           // res.send (resData);
//       } 
//     });
//   };
// })

// app.get('/dbTest', function (req, res) {
//     UserModel.find("tester", function (err, result) {
//       if(err) {
//           console.log(error);
//       } else {
//           console.log(result);
//           res.json(result);
//       }  
//     });
// })

// app.get('/login', function (req, res) {
//   userCtrl.findUser();
//   if (!req.session.user) {
//     res.sendFile( __dirname + "/public" + "/login.html" );
//   } else {
//     res.redirect("/pusa");    
//   }
// })

// app.post('/login', function (req, res) {
//   console.log(req.body);
//   UserModel.count({
//         username: req.body.username
//     }, function (err, count) {
//         if (count === 0) {
//             // next();
//             console.log("Nie");
//             res.redirect("/register");
//         } else {
//             // req.session.error = "User Exist"
//             req.session.user = {
//               username: req.body.username
//              };
//             console.log("Yep");
//             res.send ('login success');
//         }
//     });
//   // res.send ('login success');
//   // res.redirect('/pusa');
// })

// app.get('/register', function (req, res) {
//   res.sendFile( __dirname + "/public" + "/register.html"); 
//   // res.send ('login success'); 
// })

// app.get('/sessionTest', function (req, res) {
//     // res.send("sessionTest");
//     console.log(req.session);
//      req.session.user = {
//       username: 'Gooze',
//       password: '123456'
//      };
//      if(!req.session.user){                     //到达/home路径首先判断是否已经登录
//         req.session.error = "请先登录"
//         res.send("not logined");                //未登录则重定向到 /login 路径
//     }else{
//       res.send("logined");  
//     }
// })

// app.get('/domTest', function (req, res) {
//     var x = 'btn';
//     var p = '<button id="'+x+'">haha</button>';
//     res.send (p)
// })

// app.get('/pusaSignupTest', function (req, res) {
//     console.log ('you coming');
//     // res.send ("You got me!");
//     res.json ({"success": "you got me!"});
//     // res.json ({});
// })

// app.post('/pusaSignupTest', function (req, res) {
//     console.log ('you coming');
//     // res.send ("You got me!");
//     res.json ({"success": "you got me!"});
//     // res.json ({});
// })



