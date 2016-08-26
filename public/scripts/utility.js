pageData = {
	login : "visitor",//"projna"
	location : "projna",//"projna","project","featrue","build","building"
	person : "visitor",//"person"
	projna : [
		{id : "bookseeds", name : "Book Seeds", pic : "Pro1-pic", state : "intro"},
		{id : "graveyard", name : "Grave Yard", pic : "Pro2-pic", state : "intro"}
	],
	project : {
		id : "bookseeds",//"project"
		data : {}
	},
	build : {
		id : "sample",
		data : {}
	}
}

$(document).ready(checkLogIn);
function checkLogIn(){
	var userInfo;
	$.ajax({
		// type:"GET",url:"http://172.16.40.36:8081/user/checkSession",data:{},
		type:"GET",url:"/user/checkSession",data:{},
		success: function(msg){
			userInfo = msg;
			if(userInfo.status === "user"){
				$("#login").hide();
				$("#beProjna").hide();
				$("#projnaName").show();
				// alert(JSON.stringify(userInfo));
				$("#mplink").attr("href","/myprojects/" + userInfo.session.email);
				pageData.login = userInfo.session.email;
			}
			else{
				$("#login").show();
				$("#beProjna").show();
				$("#projnaName").hide();
				pageData.login = "visitor";
			}
		}
	});
}


