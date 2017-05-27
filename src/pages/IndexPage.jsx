import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class IndexPage extends PureComponent {
  componentDidMount() {
    if (!this.context.login) {
      this.context.history.replace('/')
    }
  }

  handleButtonLoadMoreClick(e) {
    console.log(e);
  }

  render() {
    const buttonAdd = (
      <Link to='/add'>
        加
      </Link>
    );

    const buttonLoadMore = (
      <button type='button'
        onClick={e => this.handleButtonLoadMoreClick(e)}>
        更多
      </button>
    );

    return (
      <div>
        <header>
          <h1>
            貼三
            {buttonAdd}
          </h1>
        </header>
        <main>
          {buttonLoadMore}
        </main>
      </div>
    );
  }
}

IndexPage.contextTypes = {
  hoodie: PropTypes.object,
  login: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  })
}

export default IndexPage;
