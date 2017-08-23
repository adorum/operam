import uniqueId from 'lodash/uniqueId';

/**
 * Create 'id' attribute for every node's child object
 * @param {[array]} Array of tree node
 */
export function setNodesId(nodes) {
  if (!Array.isArray(nodes)) {
    throw new Error('Input parameter is not valid array')
  }

  const traverse = (node) => {
    node.children.forEach(n => {
      n.id = uniqueId('nodeId_');
      traverse(n);
    })
  }

  nodes.forEach(node => {
    node.id = uniqueId('nodeId_');
    traverse(node);
  })

}

/**
 * [filter description]
 * @param  {[array]} nodes       Array of tree node
 * @param  {[string]} searchText Search text
 * match the searchText or at least one of node's child do so, otherwise false
 */
export function filter(nodes, searchText) {
  if (!Array.isArray(nodes)) {
    throw new Error('Input parameter is not valid array')
  }

  const traverse = (node) => {
    node.children.filter(x => !traverse(x, searchText)).forEach(a => {
      var index = node.children.indexOf(a);
      node.children.splice(index, 1);
    });
    return (node.name.toLowerCase().indexOf(searchText) !== -1) || (node.children.length > 0);
  };

  nodes.forEach(node => {
    traverse(node);
  });
}
