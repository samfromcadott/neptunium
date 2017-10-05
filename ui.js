//Object that contains all the nodes for the synthesizer
var nodeTree = {
	inputNote: {}
}

function addNode() {
	if ( Object.keys(nodeTree).length == 1 ) { //If no nodes exist except inputNote
		nodeTree[0] = {} //Add node zero
	} else {
		var nodeList = Object.keys(nodeTree) //Create Array of keys in nodeTree
		var lastKey = parseInt( nodeList[nodeList.length - 2] ) //Get highest numbered node (The very last node will always be inputNote)

		nodeTree[lastKey + 1] = {} //Create new node with key one higher than current highest
	}
}

function updateUiHandlers() { //Adds jquery events to new nodes
	$('.node').draggable()
	$('#background-grid').draggable()
}

$('.tool-item').mousedown( () => {
	$('#background-grid').mouseup( (event) => { // BUG: Node creation happens with delay when mouseup on any element
		//Get mouse location in current div
		var mousePos = {x: event.offsetX, y: event.offsetY}

		//Create and add node
		$('<div />', {
			class: 'node'
		}).css({
			top: mousePos.y + 'px',
			left: mousePos.x + 'px'
		}).appendTo('#background-grid')

		//Add node to nodeTree
		addNode()
		console.log(nodeTree)

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
