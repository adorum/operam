var rp = require('request-promise');
var requestPromiseRetry = require( 'request-promise-retry' );
var transform = require('./tranformation.js');

var url = 'http://imagenet.stanford.edu/python/tree.py/SubtreeXML';
var httpClient = requestPromiseRetry(rp);

function scrapeData(rootId, path, array) {
  return httpClient(`${url}?rootid=${rootId}`)
    .then(transform.transformXmlToJs)
    .then((data) => {
      var node = data.$;
      var item = {
        name: path.length ? `${path} > ${node.words}` : node.words,
        size: node.subtree_size - 1
      };
      array.push(item);
      console.log(array.length);
      if (node && node.num_children > 0) { // branch
        return Promise.all(
          data.synset.map(
            function(child) {
              if (child.$.num_children > 0) {
                return scrapeData(child.$.synsetid, item.name, array);
              } else {
                var leatItem = {
                  name: `${item.name} > ${child.$.words}`,
                  size: child.$.subtree_size - 1
                };
                array.push(leatItem);
                console.log(array.length);
              }
            }
          )
        );
      } else {
        return Promise.resolve();
      }
    });
}

module.exports = scrapeData;
