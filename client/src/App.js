import React, { Component } from 'react';
import TreeView from './tree/TreeView';
import Client from './client';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    Client.fetchCategories().then((data) => {
      this.setState({ data });
    });
  }

  render() {
    if(!this.state.data) {
        return <div>Loading...</div>;
    }

    return (
      <div className="App">
        <TreeView data={this.state.data} />
      </div>
    );
  }
}

export default App;
