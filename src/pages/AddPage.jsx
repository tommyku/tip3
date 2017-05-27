import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '../components/AppBar';

class AddPage extends Component {
  handleButtonSubmitClick(e) {
  }

  render() {
    const buttonAdd = (
      <button type=''
        onClick={e => { this.context.history.go(-1) }}>
        返回
      </button>
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
        <AppBar title={'貼三'}
          beforeTitleNode={buttonAdd} />
        <main>
          {textareaContent}
          {buttonSubmit}
        </main>
      </div>
    );
  }
}

AddPage.contextTypes = {
  history: PropTypes.shape({
    go: PropTypes.func.isRequired
  })
};

export default AddPage;
