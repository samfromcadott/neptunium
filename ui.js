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
