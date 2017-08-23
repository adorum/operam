var xml2js = require('xml2js');

var attrNumbers = ['synsetid', 'subtree_size', 'num_children'];

/**
 * Transforms xml string to json object
 * @param  {[string]} xmlString  Input xml string
 * @return {[object]}            JSON object
 */
exports.transformXmlToJs = function(xmlString) {
  if (xmlString == null) {
    throw new Error('Input parameter can not be null value');
  }

  function parseIntAllowedAttr(value, key) {
    if (attrNumbers.indexOf(key) > -1) {
      return parseInt(value, 10);
    }
    return value;
  }

  var options = {
    attrValueProcessors: [parseIntAllowedAttr],
    explicitRoot: false,
    childKey: 'children'
  }

  return new Promise((resolve, reject) => {
    xml2js.parseString(xmlString, options, function(err, data) {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

/**
 * Transforms flat array structure to tree structure with complexity O(n)
 * @param  {[arrau]} array    Flat array structure of tree nodes
 * @return {[array]}          Transformed tree structure
 */
exports.tranformArray2tree = function(array) {
  if (array == null) {
    throw new Error('Input parameter can not be null or empty array');
  }

  try {
    var output = [];
    // main loop through the input array
    for (var i = 0; i < array.length; i++) {

      var node = array[i];
      var path = node.name.split('>').map(x => x.trim());

      // helper var to keep track of current level of tree
      var currentLevelNodes = output;
      for (var j = 0; j < path.length; j++) {
        // try to find a current path in on the current tree level
        var currentPathNode = currentLevelNodes.find(x => x.name === path[j]);
        if (!currentPathNode) {
          // if havent't been found, then create a new node
          currentLevelNodes.push({
            name: path[j],
            size: j === path.length - 1 ? node.size : 0,
            children: []
          });
          // on the node is created we need to move the current tree level by one level deeper
          currentLevelNodes = currentLevelNodes[currentLevelNodes.length - 1].children;
        } else {
          // if the node already exists, move the current tree level to its children => 1 level deeper
          currentPathNode.size = (path.length - 1 === j) ? node.size : currentPathNode.size;
          currentLevelNodes = currentPathNode.children;
        }
      }
    }
    return output;
  } catch (e) {
    throw new Error('Unable to transform array to three structure');
  }
}
