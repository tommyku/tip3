import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '../components/AppBar';

const baseStyle = {
  textAlign: 'center',
}

const mainStyle = {
  maxWidth: '30em',
  display: 'block',
  margin: 'auto',
  padding: '.5em'
}

const lableStyle = {
  display: 'block',
  textAlign: 'left'
}

const inputStyle = {
  display: 'block',
  padding: '.25em .5em',
  fontSize: 'large',
  width: '100%',
  boxSizing: 'border-box'
}

const buttonBaseStyle = {
  display: 'block',
  width: '100%',
  padding: '.5em 0',
  marginTop: '1em'
}

class AddPage extends Component {
  handleButtonSubmitClick(e) {
    const value = this.refs['textareaContent'].value.trim();
    if (value.length > 0) {
      this.context.handler({action: 'newpaste', payload: {value: value}});
      this.refs['textareaContent'].value = '';
      this.context.history.replace('/index');
    } else {
      alert('都無野貼咩呀');
    }
  }

  render() {
    const { primary } = this.context.colorScheme;

    const buttonStyle = Object.assign(
      {
        color: primary,
        border: `1px solid ${primary}`,
        backgroundColor: 'transparent',
      },
      buttonBaseStyle
    );

    const buttonAdd = (
      <a href='' onClick={e => { this.context.history.go(-1) }}>
        返回
      </a>
    );

    const textareaContent = (
      <section>
        <label style={lableStyle}
          htmlFor='textareaContent'>
          貼咩
        </label>
        <textarea id='textareaContent'
          style={inputStyle}
          ref='textareaContent'
          rows={10}
          autoComplete='false'
          autoCapitalize='false'>
        </textarea>
      </section>
    );

    const buttonSubmit = (
      <section>
        <button type='button'
          style={buttonStyle}
          onClick={e => this.handleButtonSubmitClick(e)}>
          貼
        </button>
      </section>
    );

    return (
      <div style={baseStyle}>
        <AppBar beforeTitleNode={buttonAdd} />
        <main style={mainStyle}>
          {textareaContent}
          {buttonSubmit}
        </main>
      </div>
    );
  }
}

AddPage.contextTypes = {
  handler: PropTypes.func.isRequired,
  colorScheme: PropTypes.shape({
    primary: PropTypes.string.isRequired,
  }),
  history: PropTypes.shape({
    go: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  })
};

export default AddPage;
