var args = arguments[0] || {};

OS_IOS && $.cameraButton.addEventListener("click",function(_event){
	alert("user clicked camera button");
});

$.cameraButtonClicked = function(_event){
	alert("User clicked camera button");

var photoSource = Titanium.Media.getIsCameraSupported()?
Titanium.Media.showCamera : Titanium.Media.openPhotoGallery;

photoSource ({
		success : function(event){
			processImage(event.media,function(_photoResp){
				var row = Alloy.createController("feedRow",photoResp);
				
				if($.feedTable.getData().length === 0){
					$.feedTable.setData([]);
					$.feedTable.appendRow(row.getView(),true);
				} else {
					$.feedTable.insertRowBefore(0,row.getView(),true);
				}	
			});
		},
		cancel : function(){
			//calls when user cancels taking pic
		},
		
		error: function(error){
			if(error.code == Titanium.Media.NO_CAMERA){
				alert('Please run this test on device');
			} else {
				alert("Unexpected error: " + error.code);
			}
		},
		saveToPhotoGallery : false,
		allowEditing : true,
		mediaTypes : [Ti.Media.MEDIA_TYPES_PHOTO]
});

};

function processImage(_mediaObject, _callback){
	var photoObject = {
		image:_mediaObject,
		title:"Sample Photo" + new Date()
	};
	_callback(photoObject);
}

	var photo = Alloy.createModel('Photo', parameters);

	photo.save({}, {
		success : function(_model, _response) { 
			Ti.API.debug('success: ' + _model.toJSON());
			_callback({
				model : _model,
				message : null,
				success : true
			});
		},
		error : function(e) {
			
			Ti.API.error('error: ' + e.message);
			_callback({
				model : parameters,
				message : e.message,
				success : false
			});
		}
	});


function loadPhotos() {
	var rows = [];
	 var photos = Alloy.collections.photo || Alloy.collections.instance("Photo");
	 
	 var where = {
	 	title : {
	 		"$exists" : true
	 	}
	 };
	 
	 photos.fetch({
	 	data: {
	 		order : '-created_at',
	 		where : where
	 	},
	 	
	 	success : function(model, response){
	 		photos.each(function(photo){
	 			var photoRow = Alloy.createController("feedRow",photo);
	 			
	 			rows.push(photoRow.getView());
	 			
	 		});
	 		
	 		$.feedTable.data = rows;
	 		Ti.API.info(JSON.stringify(data));
	 	},
	 	error : function(error){
	 		alert('Error loading Feed ' + e.message);
	 		Ti.API.error(JSON.stringify(error));
	 	}
	 });
}

	 		
$.initialize = function(){
	loadPhotos();
};	 		

