import {
  filter,
  setNodesId
} from './tree';
import assert from 'assert';

describe('tree tests', () => {
  const inputTree = [{
    name: 'root node',
    children: [{
      name: 'subnode 1',
      children: [{
        name: 'sub subnode1',
        children: []
      }]
    }, {
      name: 'subnode 2',
      children: []
    }]
  }];

  it('should filter tree and find something', () => {
    const expected = [{
      name: 'root node',
      children: [{
        name: 'subnode 1',
        children: [{
          name: 'sub subnode1',
          children: []
        }]
      }]
    }];
    const input = JSON.parse(JSON.stringify(inputTree));
    filter(input, 'sub subnode');
    assert.deepStrictEqual(input, expected);
  });

  it('should filter tree and and find only the root node #1', () => {
    const expected = [{
      name: 'root node',
      children: []
    }];
    const input = JSON.parse(JSON.stringify(inputTree));
    filter(input, 'aaaaaa');
    assert.deepStrictEqual(input, expected);
  });

  it('should filter tree and and find only the root node #2', () => {
    const expected = inputTree;
    const input = JSON.parse(JSON.stringify(inputTree));
    filter(input, '');
    assert.deepStrictEqual(input, expected);
  });

  it('should throw error when filter parameter is not an array #1', () => {
    assert.throws(() => filter(null, ''), Error, /Input parameter is not valid array/);
  });

  it('setNodesId', () => {
    const expected = [{
      name: 'root node',
      id: 'nodeId_1',
      children: [{
        name: 'subnode 1',
        id: 'nodeId_2',
        children: [{
          name: 'sub subnode1',
          id: 'nodeId_3',
          children: []
        }]
      }, {
        name: 'subnode 2',
        id: 'nodeId_4',
        children: []
      }]
    }];
    const input = JSON.parse(JSON.stringify(inputTree));
    setNodesId(input);
    assert.deepStrictEqual(input, expected);
  });

  it('should throw error when setNodesId parameter is not an array #1', () => {
    assert.throws(() => setNodesId(null, ''), Error, /Input parameter is not valid array/);
  });
})
