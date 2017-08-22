import React, {Component} from 'react';
import TreeView from './tree/TreeView';
import Client from './utils/client';
import { filter, setNodeId } from './utils/tree';
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
    const clonedData = JSON.parse(JSON.stringify(this.state.data));
    filter(clonedData, event.target.value);
    this.setState({filteredData: clonedData});
  }

  componentDidMount() {
    Client.fetchCategories().then((data) => {
      setNodeId(data);
      this.setState({data});
    });
  }

  render() {
    if (this.state.data == null) {
      return <div>Loading...</div>;
    }

    return (
      <div className="App">
        <h1>Searchable tree structure</h1>
        <div><input type="text" placeholder="Search..." className="form-control" onChange={this.onSearchChanged}/></div>
        <TreeView data={this.state.filteredData || this.state.data} expandToLevel={2}/>
      </div>
    );
  }
}

export default App;
