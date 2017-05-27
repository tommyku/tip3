import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hoodie from '@hoodie/client'
import {
  HashRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import LoginPage from './pages/LoginPage'
import IndexPage from './pages/IndexPage'
import AddPage from './pages/AddPage'
import './App.css';

const history = createHashHistory();

class App extends Component {
  constructor(props) {
    super(props);
    const defaultState = {
      itemUuids: [],
      items: {},
      lastItem: '',
      login: false,
      hoodieHost: '',
      hoodie: null
    };

    this.state = defaultState;
  }

  componentWillMount() {
    let hoodieHost = localStorage.getItem('hoodieHost');
    if (hoodieHost !== null) {
      this.setState({hoodieHost: hoodieHost}, ()=> {
        this.setUpHoodieClient({callback: ()=> {
          this.state.hoodie.account.get('session').then((session)=> {
            this.setState({login: (session ? true : false)});
          });
        }});
      });
    }
  }

  setUpHoodieListners() {
    const signInReAuthenticateHandler = (account)=> {
      localStorage.setItem('hoodieHost', this.state.hoodieHost);
      this.setState({login: true}, ()=> history.push('/index'));
    }

    this.state.hoodie.account.on('reauthenticate', signInReAuthenticateHandler);
    this.state.hoodie.account.on('signin', signInReAuthenticateHandler);
  }

  setUpHoodieClient({callback}) {
    const hoodie = new Hoodie({
      url: this.state.hoodieHost,
      PouchDB: require('pouchdb-browser')
    });
    this.setState({hoodie: hoodie}, ()=> {
      this.setUpHoodieListners();
      if (typeof callback === 'function') callback();
    });
  }

  handleSignIn({host, username, password}) {
    const hoodieSignIn = ()=> {
      this.state.hoodie.account.signIn({
        username: username,
        password: password
      });
    };

    this.setState({hoodieHost: host}, ()=> {
      this.setUpHoodieClient({callback: hoodieSignIn});
    });
  }

  handler({action, payload}) {
    switch (action) {
      case 'signin':
        this.handleSignIn(payload);
        break;
    }
  }

  getChildContext() {
    return {
      history: history,
      hoodie: this.state.hoodie,
      handler: this.handler.bind(this)
    }
  }

  render() {
    const renderIndexPage = ()=> (
      (this.state.login) ? (
        <IndexPage />
      ) : (
        <Redirect to='/' />
      )
    );

    const renderLoginPage = ()=> (
      (this.state.login) ? (
        <Redirect to='/index' />
      ) : (
        <LoginPage />
      )
    );

    return (
      <Router history={history}>
        <div>
          <Route exact path="/" render={renderLoginPage} />
          <Route exact path="/index" render={renderIndexPage} />
          <Route exact path="/add" component={AddPage} />
        </div>
      </Router>
    );
  }
}

App.childContextTypes = {
  hoodie: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired
  }),
  handler: PropTypes.func
};

export default App;
