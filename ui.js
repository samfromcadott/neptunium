function updateUiHandlers() {
	$('.node').draggable({
		containment: "parent"
	})
}

$('.tool-item').mousedown( () => {
	$('#node-view').mouseup( (event) => {
		//Get mouse location in current div
		var mousePos = {x: event.offsetX, y: event.offsetY}

		//Create and add node
		$('<div />', {
			class: 'node'
		}).css({
			top: mousePos.y + 'px',
			left: mousePos.x + 'px'
		}).appendTo('#node-view')

		updateUiHandlers()
		$(this).unbind(event)
	})
})

// Keyboard
var keyboardHidden = false

$("#hide-keyboard").click( () => {
	if (keyboardHidden == false) {
		keyboardHidden = true
		$('#keyboard').hide()
		$("#hide-keyboard").text('^')
	} else if (keyboardHidden == true) {
		keyboardHidden = false
		$('#keyboard').show()
		$("#hide-keyboard").text('v')
	}
})

updateUiHandlers()
