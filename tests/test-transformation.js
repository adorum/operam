var transformation = require('../helpers/tranformation');
var assert = require('assert');

describe.only('transformation tests', function() {
  it('tranformArray2tree should thrown an exception #1', function() {
    assert.throws(function test() {
      transformation.tranformArray2tree(null);
    }, /Input parameter can not be null or empty array/);
  });

  it('tranformArray2tree should thrown an exception #2', function() {
    assert.throws(function test() {
      transformation.tranformArray2tree([]);
    }, /Input parameter can not be null or empty array/);
  });

  it('tranformArray2tree should thrown an exception #3', function() {
    assert.throws(function test() {
      transformation.tranformArray2tree([{}]);
    }, /Unable to transform array to three structure/);
  });

  it('tranformArray2tree should return valid tree structure', function() {

    const input = [
      {name: 'ImageNet 2011 Fall Release', size: 32326},
      {name: 'ImageNet 2011 Fall Release > plant, flora, plant life', size: 4486},
      {name: 'ImageNet 2011 Fall Release > plant, flora, plant life > phytoplankton', size: 2},
      {name: 'ImageNet 2011 Fall Release > plant, flora, plant life > phytoplankton > planktonic algae', size: 0},
      {name: 'ImageNet 2011 Fall Release > plant, flora, plant life > phytoplankton > diatom', size: 0},
      {name: 'ImageNet 2011 Fall Release > plant, flora, plant life > microflora', size: 0},
    ];

    const expected = [{
      name: 'ImageNet 2011 Fall Release',
      size: 32326,
      children: [{
        name: 'plant, flora, plant life',
        size: 4486,
        children: [{
          name: 'phytoplankton',
          size: 2,
          children: [{
            name: 'planktonic algae',
            size: 0,
            children: []
          }, {
            name: 'diatom',
            size: 0,
            children: []
          }]
        }, {
          name: 'microflora',
          size: 0,
          children: []
        }]
      }]
    }];

    assert.deepStrictEqual(transformation.tranformArray2tree(input), expected);
  });
});
