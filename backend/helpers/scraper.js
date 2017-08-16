var rp = require('request-promise');
var transform = require('./tranformation.js')

var url = 'http://imagenet.stanford.edu/python/tree.py/SubtreeXML';

function scrapeData(rootId, path, array) {
    return rp(`${url}?rootid=${rootId}`)
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
                            if(child.$.num_children > 0) {
                                return scrapeData(child.$.synsetid, item.name, array);
                            } else {
                                var leatItem =  {
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
                return null;
            }
        });
}

module.exports = scrapeData;
