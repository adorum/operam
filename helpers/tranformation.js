var xml2js = require('xml2js');

var attrNumbers = ['synsetid', 'subtree_size', 'num_children'];

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

    var options = { attrValueProcessors: [parseIntAllowedAttr], explicitRoot: false, childKey: 'children' }

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

exports.tranformArray2tree = function(array) {
    if (array == null) {
        throw new Error('Input parameter can not be null value');
    }

    var output = [];
    for (var i = 0; i < array.length; i++) {
        var chain = array[i].name.split(">").map(x => x.trim());
        var currentNode = output;
        for (var j = 0; j < chain.length; j++) {
            var wantedNode = chain[j];
            var lastNode = currentNode;
            for (var k = 0; k < currentNode.length; k++) {
                if (currentNode[k].name == wantedNode) {
                    currentNode = currentNode[k].children;
                    break;
                }
            }
            // If we couldn't find an item in this list of children
            // that has the right name, create one:
            if (lastNode == currentNode) {
                var newNode = currentNode[k] = { name: wantedNode, size: array[i].size, children: [] };
                currentNode = newNode.children;
            }
        }
    }

    return output[0];
}
