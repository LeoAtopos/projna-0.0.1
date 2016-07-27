
$(document).ready(checkLogIn);
function checkLogIn(){
	if(isLogged()){
		$("#login").hide();
		$("#beProjna").hide();
		$("#projnaName").show();
	}
	else{
		$("#login").show();
		$("#beProjna").show();
		$("#projnaName").hide();
	}
}
function isLogged(){
	var userInfo;
	$.ajax({
		type:"GET",url:"http://172.16.40.36:8081/user/checkSession",data:{},
		success: function(msg){
			userInfo = msg;
		}
	});
	if (userInfo) return true;
	else return false;
}


var email;
var password;
$(document).ready(function(){
	$("#submitButton").click(submitButtonClick);
});
function submitButtonClick(){
	email = $("#email").val();
	password = $("#password").val();
	if(isOKInput()){
		ajaxSend();
	}
}

function isOKInput(){
	if(email == "" || password == ""){
		alert(email);
		return false;
	}
	if(!email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)){
		alert("E-mail is not a real E-mail");
		$("#email").focus();
		return false;
	}
	return true;
}

function ajaxSend(){
	var params ={
		email : $("#email").val(),
		password : $("#password").val()
	}
	$.ajax({
		type:"POST",
		url:"http://172.16.40.31:8081/user/onlogin",
		data:params,
		success : function(msg){
			alert(JSON.stringify(msg));
			window.location.href="index.html";
		},
		error : function(msg){alert(JSON.stringify(msg));} 
	});
}