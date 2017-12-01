//Object that contains all the nodes for the synthesizer
var nodeTree = {}

var voices = {} //Object containing all active notes

var inputNote = {
	target: []
}

var mixer = new Tone.PanVol(0, 0).toMaster()

function addNode(type) {
	var nodeObject = {
		type: type,
		values: Object.assign({}, nodeTypes[type].values), //Copy default values form nodeTypes
		target: []
	}

	var nodeCount = Object.keys(nodeTree).length //Get number of nodes in nodeTree
	nodeObject.id = nodeCount

	nodeTree[nodeCount] = nodeObject //Add new node to the node tree

	return nodeTree[nodeCount]

}

function connectNode(node, target, note) {
	if (target == 'mixer') { //When the target is the mixer
		note[node].connect(mixer) //Connect to velocity node

	} else if (typeof target === 'object') { //When the target is specific input
		note[node].connect( note[target.node][target.value] )

	} else {
		note[node].connect(note[target])

	}
}

// //Create non-retriggering nodes
// for (var currentNode in nodeTree) {
// 	if (nodeTree.hasOwnProperty(currentNode)) { //Iterate over node tree
//
// 		if (nodeTree[currentNode].retrigger == false) { //If the node doesn't retrigger
// 			this[currentNode] = new nodeTree[currentNode].type(nodeTree[currentNode].values)
//
// 		}
//
// 	}
// }

function playNote(note, velocity) {
	var newNote = {} //Node tree of the new note

	newNote.inputNote = new Tone.Signal(note) //inputNote is a signal carrying note frequency

	//Make nodes
	for (var currentNode in nodeTree) {
		if ( nodeTree.hasOwnProperty(currentNode) ) { //Iterate over node tree

			var currentType = nodeTypes[ nodeTree[currentNode].type ]
			console.log(currentType)

			if ( currentType.hasOwnProperty('component') ) {
				newNote[currentNode] = new nodeTypes[ nodeTree[currentNode].type ].component( nodeTree[currentNode].values )
			}

			// if (currentNode == 'inputFreq') { //inputNote is a signal carrying current note frequency
			// 	newNote.inputNote = new Tone.Signal(note) //Create signal

			// } else if (nodeTree[currentNode].retrigger != false) { //When the node retriggers
			// 	//Create a node with the type of currentNode
			// 	newNote[currentNode] = new nodeTree[currentNode].type(nodeTree[currentNode].values)

			// } else if (nodeTree[currentNode].retrigger == false) { //When the node doesn't retrigger
			// 	newNote[currentNode] = this[currentNode] //Create a pointer to the node

			// }

		}
	}

	for (target of inputNote.target) {
		connectNode('inputNote', target, newNote)
	}

	//Connect nodes
	for (var currentNode in nodeTree) {
		if ( nodeTree.hasOwnProperty(currentNode) ) { //Iterate over node tree

			var currentTarget = nodeTree[currentNode].target //currentNode's target

			for (var i = 0; i < currentTarget.length; i++) { //Iterate over target array
				connectNode(currentNode, currentTarget[i], newNote)

			}

		}
	}

	//Start nodes
	for (var currentNode in newNote) {
		if (newNote.hasOwnProperty(currentNode)) { //Iterate over node tree in newNote

			if (typeof newNote[currentNode].start === 'function') { //If the node has a start function
				newNote[currentNode].start()

			} else if (typeof newNote[currentNode].triggerAttack === 'function') {
				//If the node has a triggerAttack function
				newNote[currentNode].triggerAttack()

			}
		}
	}

	voices[note] = newNote //Add newNote to voices
}

function stopNote(note) {
	//Find all envelopes and release them
	for (var currentNode in voices[note]) {
		if (voices[note].hasOwnProperty(currentNode)) { //Iterate over node in note that's ending

			if (typeof voices[note][currentNode].triggerRelease === 'function') {
				//triggerRelease and node that has the function
				voices[note][currentNode].triggerRelease()

			}

		}
	}
}
