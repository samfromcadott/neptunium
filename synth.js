//Object that contains all the nodes for the synthesizer
var nodeTree = {}

var inputNote = {
	target: []
}

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
