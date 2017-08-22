import uniqueId from 'lodash/uniqueId';

/**
 * Create 'id' attribute for every node's child object
 * @param {[object]} Tree node
 */
export function setNodeId(node) {
  if (!node.children || !node.children.length) {
    return;
  }
  node.children.forEach(n => {
    n.id = uniqueId('nodeId_');
    setNodeId(n);
  })
}

/**
 * [filter description]
 * @param  {[object]} node       Tree node
 * @param  {[string]} searchText Search text
 * @return {[boolean]}           Return true of node's name
 * match the searchText or at least one of node's child do so, otherwise false
 */
export function filter(node, searchText) {
  node.children.filter(x => !filter(x, searchText)).forEach(a => {
    var index = node.children.indexOf(a);
    node.children.splice(index, 1);
  });
  return (node.name.toLowerCase().indexOf(searchText) !== -1) || (node.children.length > 0);
}
