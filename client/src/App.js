import React, {Component} from 'react';
import TreeView from './tree/TreeView';
import Client from './client';
import {uniqueId, cloneDeep} from 'lodash';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.onSearchChanged = this.onSearchChanged.bind(this);
    this.state = {
      data: null,
      filteredData: null
    };
  }

  onSearchChanged(event) {
    const clonedData = cloneDeep(this.state.data);
    this.filter(clonedData, event.target.value);
    this.setState({ filteredData: clonedData});
  }

  setNodeId(node) {
    if (!node.children || !node.children.length) {
      return;
    }
    node.children.forEach(n => {
      n.id = uniqueId('nodeId_');
      this.setNodeId(n);
    })
  }

  filter(node, searchText) {
    node.children.filter(x => !this.filter(x, searchText)).forEach(a => {
      var index = node.children.indexOf(a);
      node.children.splice(index, 1);
    });
    return (node.name.toLowerCase().indexOf(searchText) !== -1) || (node.children.length > 0);
  }

  componentDidMount() {
    Client.fetchCategories().then((data) => {
      this.setNodeId(data);
      this.setState({ data });
    });
  }

  render() {
    if (this.state.data == null) {
      return <div>Loading...</div>;
    }

    return (
      <div className="App">
        <input type="text" placeholder="Search..." onChange={this.onSearchChanged}/>
        <TreeView data={this.state.filteredData ||  this.state.data} expandToLevel={2}/>
      </div>
    );
  }
}

export default App;
