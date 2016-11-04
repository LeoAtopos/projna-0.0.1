pageData = {
	login : "reseter@sina.com",//"projna"
	location : "projna",//"projna","project","featrue","build","building"
	person : "reseter@sina.com",//"person"
	projna : [
		{id : "bookseeds", name : "Book Seeds", pic : "Pro1-pic", state : "intro"},//build,
		{id : "epitaph", name : "Epitaph", pic : "Pro2-pic", state : "intro"}
	],
	project : {
		id : "bookseeds",//"project"
		data : {
			featurePage : [],
			featurePerson : [{id:"reseter@sina.com",name:"reseter@sina.com",pic:"per1-pic"},{id:"gz@qq.com",name:"gz@qq.com",pic:"per2-pic"}],
		}
	},
	build : {
		id : "sample",
		data : {bslist:[{age:7,bookname:"love you"},{age:8,bookname:"go to build"}]}
	}
}

$(document).ready(checkLogIn);
function checkLogIn(){
	var userInfo;
	$.ajax({
		// type:"GET",url:"http://172.16.40.36:8081/user/checkSession",data:{},
		type:"GET",url:"/user/checkSession",data:{},async:false,
		success: function(msg){
			userInfo = msg;
			if(userInfo.status === "user"){
				$("#login").hide();
				$("#beProjna").hide();
				$("#projnaName").show();
				// alert(JSON.stringify(userInfo));
				// $("#mplink").attr("href","/myprojects/" + userInfo.session.email);
				$("#mplink").attr("href","/");
				pageData.login = userInfo.session.email;
			}
			else{
				$("#login").show();
				$("#beProjna").show();
				$("#projnaName").hide();
				pageData.login = "visitor";
			}
			// updatePage(function(){
			// 	renderPage();
			// });
		}
	});
	updatePage();
	renderPage();
}

function renderProjnaName(pn){
	var dc = $("#divC");
	var personH = $("<center><div><a><h3></h3></a></div></center>");
	personH.find("h3").text(pn);
	dc.prepend(personH);
}

function getThePerson(){
	var str = window.location.href;
	var index = str.lastIndexOf("\/");  
	var username  = str.substring(index + 1, str.length);
	return username;
}

function updateFeaturePerson(){
	$.ajax({
		type:"GET",url:"/project/"+"loadFeaturePerson/"+pageData.project.id,
		async:false,
		data:{proj : pageData.project.id},
		success : function(msg){
			pageData.project.data.featurePerson = msg.msg;
		},
		error : function(msg){
			alert("something xiaoyue! for featured person");
			alert (JSON.stringify(msg));
		}
	});
}

function renderFeaturePerson(){
	var fp = pageData.project.data.featurePerson;
	if(fp.length > 0){
		fp.forEach(function(p){
			$("#feature").append(renderPerson(p));
		});
	}
}

function renderPerson(p){
	var fp = $("<div><div class = 'col-sm-6 col-md-3'><a href = '#' class='thumbnail'><img class = 'img-circle' src='../images/per1-pic.jpg' alt='通用的占位符缩略图'><center><h3 class = 'caption'>Person Name</h3></center></a></div></div>");
	fp.find("h3").text(p.name);
	fp.find("img").attr("src",'../images/'+p.pic+'.jpg');
	fp.find("a").attr("href",'/project/'+pageData.project.id+'/build/'+p.id);

	return fp;
}


