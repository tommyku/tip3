import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hoodie from '@hoodie/client'
import {
  HashRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import createHashHistory from 'history/createHashHistory';
import Paste from './data/Paste'
import LoginPage from './pages/LoginPage'
import IndexPage from './pages/IndexPage'
import AddPage from './pages/AddPage'

const history = createHashHistory();

const colorScheme = {
  primary: '#8bc34a',
  primaryText: '#ffffff'
};

class App extends Component {
  constructor(props) {
    super(props);
    const defaultState = {
      itemIds: [],
      itemsToShow: [],
      lastItemId: 0,
      login: false,
      hoodieHost: '',
      hoodie: null,
      loading: false
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
            if (session) {
              this.state.hoodie.store.find('tip3-itemIds').then((object)=> {
                let lastItemId = Math.max(0, object.ids.length - 1 - this.LOAD_SIZE);
                this.setState({itemIds: object.ids, lastItemId: lastItemId}, ()=> this.fetchItems());
              });
            }
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

    const unAuthenticateHandler = (account)=> {
      localStorage.setItem('hoodieHost', this.state.hoodieHost);
      this.setState({login: false});
    }

    const storeOnChange = (event, object)=> {
      switch (event) {
        case 'add':
          this.hoodieHandleAdd(object);
          break;
        case 'update':
          this.hoodieHandleUpdate(object);
          break;
      }
    }

    this.state.hoodie.account.on('unauthenticate', unAuthenticateHandler);
    this.state.hoodie.account.on('signout', unAuthenticateHandler);
    this.state.hoodie.account.on('reauthenticate', signInReAuthenticateHandler);
    this.state.hoodie.account.on('signin', signInReAuthenticateHandler);
    this.state.hoodie.store.on('change', storeOnChange);
  }

  hoodieHandleAdd(object) {
    //let pasteRegexp = /tip3-[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/i
    let itemIdsRegexp = 'tip3-itemIds'
    if (object._id.match(itemIdsRegexp)) {
      this.setState({itemIds: object.ids}, ()=> {
        this.fetchItems();
      });
    }
  }

  hoodieHandleUpdate(object) {
    let itemIdsRegexp = 'tip3-itemIds'
    if (object._id.match(itemIdsRegexp)) {
      this.setState({itemIds: object.ids}, ()=> {
        this.fetchItems();
      });
    }
  }

  fetchItems() {
    this.setState({loading: true});
    const idsToFetch = this.state.itemIds.slice(this.state.lastItemId, this.state.itemIds.length).reverse();
    this.state.hoodie.store.find(idsToFetch)
      .then((objects)=> {
        let newItemsToShow = objects.map(item => new Paste(item));
        this.setState({itemsToShow: newItemsToShow});
      })
      .catch(console.warn)
      .then(()=> {
        this.setState({loading: false});
      });
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

  handleLoadItem() {
    let newLastItemId = Math.max(0, this.state.lastItemId - this.LOAD_SIZE);
    this.setState({lastItemId: newLastItemId}, ()=> {
      this.fetchItems();
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

  handleNewPaste({value}) {
    let newItemIds = this.state.itemIds;
    let newPaste = new Paste({value: value});
    let itemIdsToRemove = [];
    if (newItemIds.length >= this.MAX_PASTE) {
      let tailIndex = newItemIds.length;
      let headIndex = Math.max(1, tailIndex - this.MAX_PASTE);
      itemIdsToRemove = newItemIds.slice(0, headIndex);
      newItemIds = newItemIds.slice(headIndex, tailIndex);
    }
    newItemIds.push(newPaste._id);
    this.state.hoodie.store.add(newPaste.serialize());
    console.log(itemIdsToRemove);
    this.state.hoodie.store.remove(itemIdsToRemove).then(console.log).catch(console.warn);
    this.state.hoodie.store.updateOrAdd('tip3-itemIds', {ids: newItemIds});
  }

  handler({action, payload}) {
    switch (action) {
      case 'signin':
        this.handleSignIn(payload);
        break;
      case 'loadmore':
        this.handleLoadItem();
        break;
      case 'newpaste':
        this.handleNewPaste(payload);
        break;
    }
  }

  getChildContext() {
    return {
      history: history,
      hoodie: this.state.hoodie,
      handler: this.handler.bind(this),
      colorScheme: colorScheme
    }
  }

  render() {
    const renderAddPage = ()=> (
      (this.state.login) ? (
        <AddPage />
      ) : (
        <Redirect to='/' />
      )
    );

    const renderIndexPage = ()=> (
      (this.state.login) ? (
        <IndexPage items={this.state.itemsToShow}
          loading={this.state.loading}
          hasMore={this.state.lastItemId !== 0} />
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
          <Route exact path="/add" render={renderAddPage} />
        </div>
      </Router>
    );
  }
}

App.prototype.LOAD_SIZE = 10;
App.prototype.MAX_PASTE = 500;

App.childContextTypes = {
  hoodie: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired
  }),
  handler: PropTypes.func,
  colorScheme: PropTypes.shape({
    primary: PropTypes.string.isRequired,
    primaryText: PropTypes.string.isRequired
  })
};

export default App;
