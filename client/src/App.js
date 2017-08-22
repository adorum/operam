import React, {Component} from 'react';
import TreeView from './tree/TreeView';
import Client from './client';
import uniqueId from 'lodash/uniqueId';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
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

  componentDidMount() {
    Client.fetchCategories().then((data) => {
      this.setNodeId(data);
      this.setState({data});
    });
  }

  render() {
    if (!this.state.data) {
      return <div>Loading...</div>;
    }

    return (
      <div className="App">
        <TreeView data={this.state.data} expandToLevel={2}/>
      </div>
    );
  }
}

export default App;
