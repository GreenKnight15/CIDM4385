$.widget.addEventListener('click', function(_event){
	toggleButtonByIdClicked(_event.source.it);
});

function toggleButtonByIdClicked(_buttoneId){
	if(_buttoneId === "on"){
		$.on.hide();
		$.off.show();
	} else if (_buttoneId === "off"){
		$.on.show();
		$.off.hide();
	}
}

$.widget.open();

