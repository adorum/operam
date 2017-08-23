import React, {Component} from 'react';
import TreeView from './tree/TreeView';
import Client from './utils/client';
import {filter, setNodesId} from './utils/tree';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.onSearchChanged = this.onSearchChanged.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.state = {
      data: null,
      filteredData: null,
      errorMessage: null,
      processing: false
    };
  }

  onSearchChanged(event) {
    const clonedData = JSON.parse(JSON.stringify(this.state.data));
    filter(clonedData, event.target.value);
    this.setState({filteredData: clonedData});
  }

  onDeleteClick() {
    var isApproved = window.confirm("Are you sure you want to delete all data from database?");
    if (isApproved) {
      this.setState({processing: true});
      Client.clearCategories().then(() => {
        this.setState({filteredData: [], data: [], processing: false})
      }, () => {
        this.setState({processing: false});
      });
      setTimeout(() => {
        this.setState({processing: false});
      }, 5000)
    }

  }

  componentDidMount() {
    this.setState({processing: true});
    Client.fetchCategories().then((data) => {
      setNodesId(data);
      this.setState({filteredData: data, data, processing: false});
    }, (err) => {
      err.response.json().then((body) => {
        this.setState({errorMessage: body.error, processing: false});
      });
    });
  }

  render() {
    if (this.state.errorMessage) {
      return <div className="error">{this.state.errorMessage}</div>;
    }

    if (this.state.filteredData && !this.state.filteredData.length) {
      return (
        <div className="warning">Database is empty! Please run the scraper again.</div>
      );
    }

    if (this.state.processing) {
      return (
        <div className="loading">
          <div className="spinner"></div>
          <span>Loading...</span>
        </div>
      );
    }

    if (!this.state.filteredData) {
      return null;
    }

    return (
      <div className="App">
        <div className="header">
          <h1>Searchable tree structure</h1>
          <button className="btn btn-danger" title="Deletes all data from the database" onClick={this.onDeleteClick}>Delete all Data</button>
        </div>

        <div><input type="text" placeholder="Search..." className="form-control" onChange={this.onSearchChanged}/></div>
        <TreeView data={this.state.filteredData} expandToLevel={2}/>
      </div>
    );
  }
}

export default App;
