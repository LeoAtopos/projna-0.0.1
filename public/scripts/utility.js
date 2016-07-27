
$(document).ready(checkLogIn);
function checkLogIn(){
	var userInfo;
	$.ajax({
		type:"GET",url:"http://172.16.40.36:8081/user/checkSession",data:{},
		success: function(msg){
			userInfo = msg;
			if(userInfo.status === "user"){
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
	});
}


