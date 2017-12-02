// Node Building

function buildNodeUI(node) {
	var newNodeDiv = $('<div />', { //Create the node div
		class: 'node'
	})

	//Create the bus area
	var busArea = $('<div />', { //Create the bus area div
		class: 'node-bus'
	})

	var busInWrapper = $('<div />', { //Create the bus in wrapper
		class: 'bus-in-wrapper'
	}).appendTo(busArea)

	var busOutWrapper = $('<div />', { //Create the bus out wrapper
		class: 'bus-out-wrapper'
	}).appendTo(busArea)

	//Create the control area div
	var controlArea = $('<div />', {
		class: 'node-control'
	})

	//Add nodes
	for (var key in nodeTypes[node.type].ui) {
		if (nodeTypes[node.type].ui.hasOwnProperty(key)) {
			var currentElement = nodeTypes[node.type].ui[key]

			if (currentElement.type == 'title') {
				newNodeDiv.prepend('<span class="title">'+currentElement.text+'</span>')

			} else if (currentElement.type == 'number') {
				addNumber(node, currentElement).appendTo(controlArea)

			} else if (currentElement.type == 'dropdown') {
				addDropdown(node, currentElement).appendTo(controlArea)

			} else if (currentElement.type == 'bus-in') {
				addBus(node, currentElement, 'in').appendTo(busInWrapper)

			} else if (currentElement.type == 'bus-out') {
				addBus(node, currentElement, 'out').appendTo(busOutWrapper)

			}

		}
	}

	newNodeDiv.css(nodeTypes[node.type].css) //Apply node type style
	newNodeDiv.append(busArea)
	newNodeDiv.append(controlArea)

	return newNodeDiv

}

function addNumber(node, element) {
	//Wrapper for number and label
	var numberWrapper = $('<div class="wrapper"></div>')

	//Number input
	var numberInput = $('<input />', {
		class: 'number-input',
		type: 'number',
		value: node.values[element.value],
		change: function () {
			node.values[element.value] = parseFloat( $(this).val(), 10 ) //Update value
		}
	})

	if (typeof element.min === 'number') { //If a minimum is defined
		numberInput.attr('min', element.min)
	}
	if (typeof element.max === 'number') { //If a maximum is defined
		numberInput.attr('max', element.max)
	}
	if (typeof element.step === 'number') { //If a step is defined
		numberInput.attr('step', element.step)
	}

	numberInput.data('node', node.id) //Add node and value data for connections
	numberInput.data('value', element.value)

	numberInput.appendTo(numberWrapper)

	//Label
	var numberLabel = $('<span class="label">'+element.label+'</span>')
	numberLabel.prependTo(numberWrapper)

	return numberWrapper
}

function addDropdown(node, element) {
	//Wrapper for dropdown and label
	var dropdownWrapper = $('<div class="wrapper"></div>')

	//Number input
	var dropdown = $('<select />', {
		class: 'dropdown-input',
		change: function () {
			node.values[element.value] = $(this).val() //Update value
		}
	})
	dropdown.appendTo(dropdownWrapper)

	//Options
	for (var i = 0; i < element.options.length; i++) {
		dropdown.append('<option value="'+element.options[i].value+'">'+element.options[i].label+'</option>')
	}

	dropdown.val(node.values[element.value])//Set dropdown value

	//Label
	var dropdownLabel = $('<span class="label">'+element.label+'</span>')
	dropdownLabel.prependTo(dropdownWrapper)

	return dropdownWrapper
}

function addBus(node, element, direction) {
	var busWrapper = $('<div />', {
		class: 'bus-wrapper'
	})

	var busLabel = $('<span />', {
		class: 'bus-label',
		text: element.label
	})

	var newBus = $('<div />', {
		class: 'bus'
	})

	if (node.type == 'Input Note') { //When the node is a note input set 'node' to 'Input Note'
		newBus.data('node', 'Input Note')
	} else if (node.type == 'Mixer') { //When the node is a mixer set 'node' to 'Mixer'
		newBus.data('node', 'mixer')
	} else {
		newBus.data('node', node.id)
	}

	if (direction == 'out') {
		newBus.addClass('out') //Add out class
		newBus.on('mousedown', connectHandler) //Add the ability to draw connections from outputs

	} else if (direction == 'in') {
		newBus.addClass('in') //Add in classs

	}

	busWrapper.append(newBus)
	busWrapper.append(busLabel)

	return busWrapper

}

// Node List

for (var node in nodeTypes) {
	if (nodeTypes.hasOwnProperty(node)) {
		$('#tool-list').append('<li class="tool-item">'+node+'</li>')
	}
}

$('.tool-item').mousedown( function(event) {
	if (event.which == 1) { //Only fire on left click
		event.preventDefault()
		var newNodeType = $(this).text() //Get name of node

		$(document).one('mouseup', function(event) { //Only fire event one time per click
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

				//Make node draggable
				newNodeDiv.draggable({
					cancel: '.node-control, .node-bus',
					drag: function() {
						updateLines()
						newNode.position = $(this).position() //Update node position
					},
					start: function () {
						newNodeDiv.css({
							'box-shadow': '6px 6px black'
						})
					},
					stop: function() {
						newNodeDiv.css({
							'box-shadow': '3px 3px black'
						})
					}

				})

		})
	}
})

// Node View

// $('#node-view').bind( 'mousewheel', (event) => {
// 	// console.log(event.originalEvent.deltaY)
// 	var currentZoom = $('#node-view').css('zoom')
// 	console.log(currentZoom)
//
// 	if (event.originalEvent.deltaY > 0) {
// 		currentZoom *= 0.75
// 	} else if (event.originalEvent.deltaY < 0) {
// 		currentZoom *= 1.5
// 	}
//
// 	// var zoomAmount = 2 * ( event.originalEvent.deltaY / Math.abs(event.originalEvent.deltaY) ) + 1
// 	// console.log('Zoom amount: ', zoomAmount)
// 	$('#node-view').animate({ 'zoom': currentZoom}, 50)
// })

$('#background-grid').draggable({ //Make view position moveable
	cancel: '.node'
})

// Buses

var draw = SVG('drawing')
var lineArray = []

function getBusPosition(div) {
	return {
		x: (div.offset().left - $('#background-grid').offset().left) + ( div.width() / 2 ),
		y: (div.offset().top - $('#background-grid').offset().top) + ( div.height() / 2 )
	}
}

function updateLines() {
	for (currentLine of lineArray) {
		var newStart = getBusPosition(currentLine.startDiv)
		var newEnd = getBusPosition(currentLine.endDiv)

		currentLine.vector.attr({
			x1: newStart.x,
			y1: newStart.y,
			x2: newEnd.x,
			y2: newEnd.y
		})

	}

}

function Line(start) {
	this.startDiv = start

	this.startPos = getBusPosition(start)
	this.endPos = this.startPos

	this.vector = draw.line(
		this.startPos.x,
		this.startPos.y,
		this.endPos.x,
		this.endPos.y
	).stroke({
		width: 10,
		color: '#' + ( Math.random() * 0xffffff << 0).toString(16),
		linecap: 'round'
	}).addClass('bus-vector')

	this.connectBusses = function (start, end) {
		var startNode //Target array of starting node
		var target //Value or node of ending element

		if (start.data('node') == 'Input Note') { //When the starting node is an Input Note
			startNode = inputNote
		} else {
			startNode = nodeTree[start.data('node')]
		}

		if (end.is('.bus, .in')) { //When connecting busses to busses target is just a number
			target = end.data('node')

		} else if (end.is('.number-input')) { //For busses to numbers it's an object
			target = {node: end.data('node'), value: end.data('value')}

		}

		startNode.target.push( target ) //Add the new target to starting node's target array

		this.endDiv = end

		var newEnd = getBusPosition(end)

		this.vector.attr({
			x2: newEnd.x,
			y2: newEnd.y
		})

	}

	this.dragline = function (event) {
		this.vector.attr({
			x2: event.offsetX,
			y2: event.offsetY
		})
	}



	lineArray[lineArray.length] = this
}

var connectHandler = function (event) {
	if (event.which == 1) {
		event.preventDefault()

		var start = $(event.target)
		var line = new Line(start)

		$(document).mousemove( function (event) {
			line.vector.attr({
				x2: event.pageX - $('#background-grid').offset().left,
				y2: event.pageY - $('#background-grid').offset().top
			})
		})

		$(document).one('mouseup', function(event) {
			var end = $(event.target)
			$(document).off('mousemove')

			if (end.is('.bus, .in') && end.data('node') != start.data('node')) {
				line.connectBusses(start, end) //When connecting a bus out to a bus in

			} else if (end.is('.number-input') && end.data('node') != start.data('node')) {
				line.connectBusses(start, end) //When connecting a bus out to a number

			} else {
				line.vector.remove() //Remove the drawn line

				delete line //Get rid of line object and reference in lineArray
				lineArray.pop()
			}

		})
	}
}

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

var keyboard = new QwertyHancock({
	id: 'keyboard',
	width: 1000,
	height: 100,
	octaves: 3,
	startNote: 'A2',
	whiteNotesColour: 'white',
	blackNotesColour: 'black',
	hoverColour: '#f3e939'
})

keyboard.keyDown = function (note, frequency) {
	playNote(frequency, 1)
};

keyboard.keyUp = function (note, frequency) {
	stopNote(frequency)
};
