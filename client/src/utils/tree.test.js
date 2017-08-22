import {
  filter,
  setNodeId
} from './tree';
import assert from 'assert';

describe('tree tests', () => {
  const inputTree = {
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
  };

  it('should filter tree and find something', () => {
    const expected = {
      name: 'root node',
      children: [{
        name: 'subnode 1',
        children: [{
          name: 'sub subnode1',
          children: []
        }]
      }]
    };
    const input = JSON.parse(JSON.stringify(inputTree));
    filter(input, 'sub subnode');
    assert.deepStrictEqual(input, expected);
  });

  it('should filter tree and and find only the root node #1', () => {
    const expected = {
      name: 'root node',
      children: []
    };
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

  it('setNodeId', () => {
    const expected = {
      name: 'root node',
      children: [{
        name: 'subnode 1',
        id: 'nodeId_1',
        children: [{
          name: 'sub subnode1',
          id: 'nodeId_2',
          children: []
        }]
      }, {
        name: 'subnode 2',
        id: 'nodeId_3',
        children: []
      }]
    };
    const input = JSON.parse(JSON.stringify(inputTree));
    setNodeId(input);
    assert.deepStrictEqual(input, expected);
  });
})
