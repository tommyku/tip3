import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import logo from '../icon-192x192.png'

const baseStyle = {
  textAlign: 'center',
}

const buttonStyle = {
  display: 'block',
  width: '100%',
  fontSize: 'large'
}

const mainStyle = {
  maxWidth: '30em',
  display: 'block',
  margin: 'auto'
}

const sectionStyle = {
  marginBottom: '1em'
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

class LoginPage extends PureComponent {
  handleButtonSubmitClick(e) {
    const host = this.refs['inputHoodieHost'].value;
    const username = this.refs['inputUsername'].value;
    const password = this.refs['inputPassword'].value;
    this.context.handler({
      action: 'signin',
      payload: {
        host: host,
        username: username,
        password: password
      }
    })
  }

  render() {
    const inputHoodieHost = (
      <section style={sectionStyle}>
        <label style={lableStyle} htmlFor='inputHoodieHost'>邊度黎</label>
        <input id='inputHoodieHost'
          ref='inputHoodieHost'
          type='url'
          style={inputStyle}
          placeholder='e.g. https://hoodie.on9'
          autoComplete='false'
          autoCapitalize='false' />
      </section>
    );

    const inputUsername = (
      <section style={sectionStyle}>
        <label style={lableStyle} htmlFor='inputUsername'>叫咩名</label>
        <input id='inputUsername'
          ref='inputUsername'
          type='text'
          style={inputStyle}
          placeholder='e.g. iamsorjai'
          autoComplete='false'
          autoCapitalize='false' />
      </section>
    );

    const inputPassword = (
      <section style={sectionStyle}>
        <label style={lableStyle} htmlFor='inputPassword'>密碼呢</label>
        <input id='inputPassword'
          ref='inputPassword'
          type='password'
          style={inputStyle}
          placeholder='e.g. notpassword'
          autoComplete='false'
          autoCapitalize='false' />
      </section>
    );

    const buttonSubmit = (
      <section style={sectionStyle}>
        <button type='button'
          style={buttonStyle}
          onClick={e => this.handleButtonSubmitClick(e)}>
          登入
        </button>
      </section>
    );

    return (
      <div style={baseStyle}>
        <header>
          <img src={logo} alt='貼三logo' />
        </header>
        <main style={mainStyle}>
          {inputHoodieHost}
          {inputUsername}
          {inputPassword}
          {buttonSubmit}
        </main>
      </div>
    );
  }
}

LoginPage.contextTypes = {
  handler: PropTypes.func.isRequired
}

export default LoginPage;
