'use strict'

function yesRadioEventHandler() {
	$('#yes').on('change', function() {
		$('.client-info').show();
	});
}

function noRadioEventHandler() {
	$('#no').on('change', function() {
		$('.client-info').hide();
	});
}

function buttonHandler() {
	yesRadioEventHandler();
	noRadioEventHandler();
}

$(buttonHandler);