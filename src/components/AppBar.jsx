import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const h1Style = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
}

const leftNodeStyle = {
  display: 'flex'
}

const titleNodeStyle = {
  marginLeft: '1em',
  display: 'inline-block'
}

class AppBar extends PureComponent {
  render() {
    const {
      title,
      beforeTitleNode,
      afterTitleNode,
      ...others
    } = this.props;

    return (
      <header {...others}>
        <h1 style={h1Style}>
          <span style={leftNodeStyle}>
            <span>{beforeTitleNode}</span>
            <span style={titleNodeStyle}>{title}</span>
          </span>
          <span>{afterTitleNode}</span>
        </h1>
      </header>
    )
  }
}

AppBar.propTypes = {
  title: PropTypes.node,
  beforeTitleNode: PropTypes.node,
  afterTitleNode: PropTypes.node,
}

export default AppBar;
