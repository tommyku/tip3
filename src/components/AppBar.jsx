import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const h1Style = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  margin: 0,
  padding: '.25em 1em',
}

const leftNodeStyle = {
  display: 'flex'
}

const rightNodeStyle = {
  alignSelf: 'center'
}

const titleNodeStyle = {
  display: 'inline-block'
}

const headerBaseStyle = {
  width: '100%',
  margin: 0,
  padding: 0,
  minHeight: '70px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}

class AppBar extends PureComponent {
  render() {
    const {
      title,
      beforeTitleNode,
      afterTitleNode,
      style,
      ...others
    } = this.props;

    const {
      primary,
      primaryText
    } = this.context.colorScheme;

    const headerStyle = Object.assign(
      {
        backgroundColor: primary,
        color: primaryText
      },
      headerBaseStyle,
      style
    );

    return (
      <header style={headerStyle} {...others}>
        <h1 style={h1Style}>
          <span style={leftNodeStyle}>
            <span>{beforeTitleNode}</span>
            <span style={titleNodeStyle}>{title}</span>
          </span>
          <span style={rightNodeStyle}>{afterTitleNode}</span>
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

AppBar.contextTypes = {
  colorScheme: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    primaryText: PropTypes.string.isRequired
  })
}

export default AppBar;
