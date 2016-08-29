pageData = {
	login : "reseter@sina.com",//"projna"
	location : "projna",//"projna","project","featrue","build","building"
	person : "reseter@sina.com",//"person"
	projna : [
		{id : "bookseeds", name : "Book Seeds", pic : "Pro1-pic", state : "intro"},//build,
		{id : "graveyard", name : "Grave Yard", pic : "Pro2-pic", state : "intro"}
	],
	project : {
		id : "bookseeds",//"project"
		data : {
			featruePage : [],
			featruePerson : [],
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


