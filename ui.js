//Object that contains all the nodes for the synthesizer
var nodeTree = {
	inputNote: {}
}

function addNode() {
	if ( Object.keys(nodeTree).length == 1 ) { //If no nodes exist except inputNote
		nodeTree[0] = {} //Add node zero
		return nodeTree[0]
	} else {
		var nodeList = Object.keys(nodeTree) //Create Array of keys in nodeTree
		var lastKey = parseInt( nodeList[nodeList.length - 2] ) //Get highest numbered node (The very last node will always be inputNote)

		nodeTree[lastKey + 1] = {} //Create new node with key one higher than current highest
		return nodeTree[lastKey + 1]
	}
}


for (var node in nodeTypes) {
	if (nodeTypes.hasOwnProperty(node)) {
		$('#tool-list').append('<li class="tool-item">'+node+'</li>')
	}
}


function updateUiHandlers() { //Adds jquery events to new nodes
	$('#background-grid').draggable()
}

$('.tool-item').mousedown( () => {
	$('#background-grid').mouseup( (event) => { // BUG: Node creation happens with delay when mouseup on any element
		//Get mouse location in current div
		var mousePos = {x: event.offsetX, y: event.offsetY}

		var newNode = addNode()

		//Create and add node
		var newNodeDiv = $('<div />', {
			class: 'node'
		})

		newNodeDiv.css({
			top: mousePos.y + 'px',
			left: mousePos.x + 'px'
		})

		newNodeDiv.appendTo('#background-grid')

		newNode.position = { //Store node's position
		top: mousePos.y,
		left: mousePos.x
	}

	newNodeDiv.draggable({
		drag: function() {
			newNode.position = $(this).position() //Update node position

		}

	})

	console.log(nodeTree)

	//Add node to nodeTree
	$(this).unbind(event)
})
})

$('#node-view').bind( 'mousewheel', (event) => {
	// console.log(event.originalEvent.deltaY)
	var currentZoom = $('#node-view').css('zoom')
	console.log(currentZoom)

	if (event.originalEvent.deltaY > 0) {
		currentZoom *= 0.75
	} else if (event.originalEvent.deltaY < 0) {
		currentZoom *= 1.5
	}

	// var zoomAmount = 2 * ( event.originalEvent.deltaY / Math.abs(event.originalEvent.deltaY) ) + 1
	// console.log('Zoom amount: ', zoomAmount)
	$('#node-view').animate({ 'zoom': currentZoom}, 50)
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
