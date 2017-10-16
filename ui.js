// Node Building

function buildNodeUI(node) {
	var newNodeDiv = $('<div />', { //Create the node div
		class: 'node'
	})

	for (var key in nodeTypes[node.type].ui) {
		if (nodeTypes[node.type].ui.hasOwnProperty(key)) {
			var currentElement = nodeTypes[node.type].ui[key]

			if (currentElement.type == 'title') {
				newNodeDiv.prepend('<span class="title">'+currentElement.text+'</span>')

			} else if (currentElement.type == 'knob') {
				addKnob(node, currentElement).appendTo(newNodeDiv)

			} else if (currentElement.type == 'number') {
				addNumber(node, currentElement).appendTo(newNodeDiv)

			}

		}
	}

	newNodeDiv.css(nodeTypes[node.type].css) //Apply node type style

	return newNodeDiv

}

function addKnob(node, element) {
	//Wrapper for knob and label
	var knobWrapper = $('<div class="wrapper"></div>')

	//Knob
	var newKnob = $('<input type="text" class="knob" value="'+node.values[element.value]+'">').knob({
		change: function (v) {
			node.values[element.value] = v //Update the value
		},
		min: element.min,
		max: element.max,
		width: 80,
		height: 80,
		thickness: 0.3,
		angleOffset: -125,
		angleArc: 250
	})
	newKnob.appendTo(knobWrapper)

	//Label
	var knobLabel = $('<span class="label">'+element.label+'</span>')
	knobLabel.prependTo(knobWrapper)

	//Return wrapper
	return knobWrapper

}

function addNumber(node, element) {
	//Wrapper for number and label
	var numberWrapper = $('<div class="wrapper"></div>')

	//Number input
	var numberInput = $('<input />', {
		class: 'number-input',
		type: 'number',
		value: node.values[element.value],
		min: element.min,
		max: element.max,
		change: function () {
			node.values[element.value] = parseInt( $(this).val(), 10 ) //Update value
		}
	})
	numberInput.appendTo(numberWrapper)

	//Label
	var numberLabel = $('<span class="label">'+element.label+'</span>')
	numberLabel.prependTo(numberWrapper)

	return numberWrapper
}

// Node List

for (var node in nodeTypes) {
	if (nodeTypes.hasOwnProperty(node)) {
		$('#tool-list').append('<li class="tool-item">'+node+'</li>')
	}
}

$('.tool-item').mousedown( function () { // NOTE: Requires anonymous function, not inline

	var newNodeType = $(this).text() //The type of the selected node

	$('#background-grid').mouseup( (event) => { // BUG: Node creation happens with delay when mouseup on any element
		//Get mouse location in current div
		var mousePos = {x: event.offsetX, y: event.offsetY}

		var newNode = addNode(newNodeType)

		var newNodeDiv = buildNodeUI(newNode)

		newNodeDiv.css({ //Set node at corect positon
			top: mousePos.y + 'px',
			left: mousePos.x + 'px'
		})

		newNode.position = { //Store node's position
			top: mousePos.y,
			left: mousePos.x
		}

		newNodeDiv.appendTo('#background-grid')

		newNodeDiv.draggable({
			handle: '.title',
			drag: function() {
				newNode.position = $(this).position() //Update node position

			}
		})

		//Add node to nodeTree
		$(this).unbind(event)
	})
})

// Node View

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

$('#background-grid').draggable({ //Make view position moveable
	cancel: '.node'
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
