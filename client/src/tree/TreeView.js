import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TreeNode from './TreeNode';
import './TreeView.css';

class TreeView extends Component {

  renderNodes(nodes) {
    return nodes.map(x => (<TreeNode key={x.id} node={x} expandToLevel={this.props.expandToLevel} level={1}/>));
  }
  render() {
    return (
      <div className='treeview'>
        <ul className='list-group'>{this.renderNodes(this.props.data)}</ul>
      </div>
    );
  }
}

TreeView.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({name: PropTypes.string.isRequired, size: PropTypes.number.isRequired, children: PropTypes.array.isRequired})),
  expandToLevel: PropTypes.number
}

TreeView.defaultProps = {
  expandToLevel: 2
};

export default TreeView;
