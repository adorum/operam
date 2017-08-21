import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TreeNode from './TreeNode';
import './TreeView.css';

class TreeView extends Component {

  render() {
    return (
      <div className='treeview'>
        <ul className='list-group'>
          <TreeNode node={this.props.data}
            level={1}
            visible={true}
          />
        </ul>
      </div>
    );
  }
}

TreeView.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    children: PropTypes.array.isRequired
  })
}

export default TreeView;
