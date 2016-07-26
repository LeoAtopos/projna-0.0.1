
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
		type:"GET",url:"http://127.0.0.1:8081/user/checkSession",data:{},
		success: function(msg){
			userInfo = msg;
		}
	});
	if (userInfo) return true;
	else return false;
}
