import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '../components/AppBar';

class AddPage extends Component {
  handleButtonSubmitClick(e) {
    const value = this.refs['textareaContent'].value.trim();
    if (value.length > 0) {
      this.context.handler({action: 'newpaste', payload: {value: value}});
      this.refs['textareaContent'].value = '';
      this.context.history.replace('/index');
    }
  }

  render() {
    const buttonAdd = (
      <a href='' onClick={e => { this.context.history.go(-1) }}>
        返回
      </a>
    );

    const textareaContent = (
      <section>
        <label htmlFor='textareaContent'>貼咩</label>
        <textarea id='textareaContent'
          ref='textareaContent'
          autoComplete='false'
          autoCapitalize='false'>
        </textarea>
      </section>
    );

    const buttonSubmit = (
      <section>
        <button type='button'
          onClick={e => this.handleButtonSubmitClick(e)}>
          貼
        </button>
      </section>
    );

    return (
      <div>
        <AppBar beforeTitleNode={buttonAdd} />
        <main>
          {textareaContent}
          {buttonSubmit}
        </main>
      </div>
    );
  }
}

AddPage.contextTypes = {
  handler: PropTypes.func.isRequired,
  history: PropTypes.shape({
    go: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  })
};

export default AddPage;
