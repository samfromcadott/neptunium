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

			} else if (currentElement.type == 'knob') {
				addKnob(node, currentElement).appendTo(controlArea)

			} else if (currentElement.type == 'number') {
				addNumber(node, currentElement).appendTo(controlArea)

			} else if (currentElement.type == 'dropdown') {
				addDropdown(node, currentElement).appendTo(controlArea)

			} else if (currentElement.type == 'bus-in') {
				addBus(node, currentElement).appendTo(busInWrapper)

			} else if (currentElement.type == 'bus-out') {
				addBus(node, currentElement).appendTo(busOutWrapper)

			}

		}
	}

	newNodeDiv.css(nodeTypes[node.type].css) //Apply node type style
	newNodeDiv.append(busArea)
	newNodeDiv.append(controlArea)

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

function addBus(node, element) {
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

	newBus.on('mousedown', connectHandler)

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
							'box-shadow': '6px 6px black',
							'z-index': '2'
						})
					},
					stop: function() {
						newNodeDiv.css({
							'box-shadow': '3px 3px black',
							'z-index': '1'
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
	}).style('z-index', '5')

	this.connectBoxes = function (end) {
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

			if(end.hasClass('.bus') == true && end != start) {
				line.connectBoxes(end)

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
