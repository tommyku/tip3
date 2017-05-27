import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import logo from '../icon-192x192.png'

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
      <section>
        <label htmlFor='inputHoodieHost'>邊度黎</label>
        <input id='inputHoodieHost'
          ref='inputHoodieHost'
          type='url'
          placeholder='e.g. https://hoodie.on9'
          autoComplete='false'
          autoCapitalize='false' />
      </section>
    );

    const inputUsername = (
      <section>
        <label htmlFor='inputUsername'>叫咩名</label>
        <input id='inputUsername'
          ref='inputUsername'
          type='text'
          placeholder='e.g. iamsorjai'
          autoComplete='false'
          autoCapitalize='false' />
      </section>
    );

    const inputPassword = (
      <section>
        <label htmlFor='inputPassword'>密碼呢</label>
        <input id='inputPassword'
          ref='inputPassword'
          type='password'
          placeholder='e.g. notpassword'
          autoComplete='false'
          autoCapitalize='false' />
      </section>
    );

    const buttonSubmit = (
      <section>
        <button type='button'
          onClick={e => this.handleButtonSubmitClick(e)}>
          登入
        </button>
      </section>
    );

    return (
      <div>
        <header>
          <img src={logo} alt='貼三logo' />
        </header>
        <main>
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
