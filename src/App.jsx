import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  HashRouter as Router,
  Route,
  Link
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
      login: false
    };
    this.state = defaultState;
  }

  componentDidMount() {
    // hoodie signin/signout handler
    // set login if has hoodie session
    // fetch item
  }

  componentWillUnmount() {
    // unregister hoodie handlers
  }

  getChildContext() {
    return {
      history: history,
      hoodie: {},
      login: this.state.login
    }
  }

  render() {
    const renderIndexPage = ()=> {
      return (
        <IndexPage />
      );
    };

    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/index" render={renderIndexPage} />
          <Route exact path="/add" component={AddPage} />
        </div>
      </Router>
    );
  }
}

App.childContextTypes = {
  hoodie: PropTypes.object,
  login: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired
  })
};

export default App;
