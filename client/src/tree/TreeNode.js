import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TreeNode.scss';

class TreeNode extends Component {

  constructor(props) {
    super(props);
    const maxAutoExpandLevel = 2;
    this.state = {
      expanded: (this.props.level < maxAutoExpandLevel) ? true : false
    };
  }

  toggleExpanded(id, event) {
    this.setState({ expanded: !this.state.expanded });
    event.stopPropagation();
  }

  render() {
    const node = this.props.node;
    const children = [];
    if (node.children) {
      node.children.forEach((node) => {
        children.push(<TreeNode node={node}
                                level={this.props.level+1}
                                visible={this.state.expanded && this.props.visible}
                                options={this.props.options} />);
      });
    }

    return (
      <li className='list-group-item'>
        {this.props.node.name}
        {this.state.expanded ? children : null}
      </li>
    );
  }
}

TreeNode.propTypes = {
  node: PropTypes.shape({
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    children: PropTypes.array.isRequired
  })
}

export default TreeNode;
