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
            expandToLevel={this.props.expandToLevel}
            level={1}
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
  }),
  expandToLevel: PropTypes.number
}

TreeView.defaultProps = {
  expandToLevel: 2
};

export default TreeView;
