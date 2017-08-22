import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './TreeNode.css';

class TreeNode extends Component {

  constructor(props) {
    super(props);
    const {expandToLevel, level} = this.props;
    this.state = {
      expanded: (level < expandToLevel)
        ? true
        : false
    };
  }

  toggleExpanded(id, event) {
    this.setState({
      expanded: !this.state.expanded
    });
    event.stopPropagation();
  }

  renderIcon() {
    const node = this.props.node;
    const expanded = this.state.expanded;

    if (node.children && node.children.length) {
      if (expanded) {
        return <span className="glyphicon glyphicon-minus" onClick={this.toggleExpanded.bind(this, node.nodeId)}></span>;
      }
      return <span className="glyphicon glyphicon-plus" onClick={this.toggleExpanded.bind(this, node.nodeId)}></span>;
    } else {
      return <span className="glyphicon"></span>;
    }
  }

  renderTitle() {
    return `${this.props.node.name} (${this.props.node.size})`;
  }

  render() {
    const {node, level, expandToLevel} = this.props;
    const children = [];
    if (node.children) {
      node.children.forEach((node) => {
        children.push(<TreeNode node={node} key={node.id} level={level + 1} expandToLevel={expandToLevel}/>);
      });
    }

    return (
      <li className='list-group-item'>
        {this.renderIcon()}
        {this.renderTitle()}
        {this.state.expanded
          ? (
            <ul>{children}</ul>
          )
          : null}
      </li>
    );
  }
}

TreeNode.propTypes = {
  node: PropTypes.shape({name: PropTypes.string.isRequired, size: PropTypes.number.isRequired, children: PropTypes.array.isRequired}),
  expandToLevel: PropTypes.number.isRequired
}

export default TreeNode;
