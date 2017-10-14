//Object that contains all the nodes for the synthesizer
var nodeTree = {
	inputNote: {}
}

function addNode(type) {
	var nodeObject = {
		type: type,
		values: Object.assign({}, nodeTypes[type].values) //Copy default values form nodeTypes
	}

	if ( Object.keys(nodeTree).length == 1 ) { //If no nodes exist except inputNote
		nodeTree[0] = nodeObject //Add node zero
		return nodeTree[0]
	} else {
		var nodeList = Object.keys(nodeTree) //Create Array of keys in nodeTree
		var lastKey = parseInt( nodeList[nodeList.length - 2] ) //Get highest numbered node (The very last node will always be inputNote)

		nodeTree[lastKey + 1] = nodeObject //Create new node with key one higher than current highest
		return nodeTree[lastKey + 1]
	}
}
