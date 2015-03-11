function doOpen(){
	
if(OS_ANDROID){
 var activity = $.getView().activity;
 var menuItem = null;
 
activity.onCreateOptionMenu = function(e){

if($.tabGroup.activeTab.title === "Feed"){

menuItem = e.menu.add({
	title:"PHOTO",
	showAsAction : Ti.Android.SHOW_AS_ACTION_ALWAYS,
	icon : Ti.Android.R.drawable.ic_menu_camera
	});
menuItem.addEventListener("click",function(e){
	$.feedController.cameraButtonClicked();
	});
}
};

activity.invalidateOptionMenu();

$.tabGroup.addEventListener('blur', function(_event) {
$.getView().activity.invalidOptionMenu();
});
}
}

var user = Alloy.createModel('User');

user.login("GreenKnight15","password",function(_response){
	if(_response.success){
		$.index.open();
		$.feedController.initialize();
	} 
	else{
		alert("error starting app" + _response.error);
		Ti.API.error('error logging in ' + _response.error);
	}
	});
	


$.index.open();
$.tabGroup.open();

