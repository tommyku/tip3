import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AutoLinkText from 'react-autolink-text2';
import AppBar from '../components/AppBar'

class IndexPage extends PureComponent {
  handleButtonLoadMoreClick(e) {
    this.context.handler({action: 'loadmore'});
  }

  render() {
    const {
      items,
      hasMore
    } = this.props;

    const buttonAdd = (
      <Link to='/add'>
        加
      </Link>
    );

    const buttonLoadMore = (
      <button type='button'
        disabled={!hasMore}
        onClick={e => this.handleButtonLoadMoreClick(e)}>
        {(hasMore) ? '更多' : '無喇'}
      </button>
    );

    const Item = ({text})=> (
      <p>
        <AutoLinkText text={text} />
      </p>
    );

    const ItemList = ({items})=> (
      <section>
        {
          items.map((item)=> {
            return (
              <div key={item._id}>
                <Item text={item.value} />
              </div>
            )
          })
        }
      </section>
    );

    return (
      <div>
        <AppBar title='貼三'
          afterTitleNode={buttonAdd} />
        <main>
          <ItemList items={items} />
          {buttonLoadMore}
        </main>
      </div>
    );
  }
}

IndexPage.contextTypes = {
  hoodie: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }),
  handler: PropTypes.func.isRequired
}

export default IndexPage;
