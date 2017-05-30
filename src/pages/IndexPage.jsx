import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AutoLinkText from 'react-autolink-text2';
import AppBar from '../components/AppBar';
import groupBy from 'lodash.groupby';
import timeago from 'timeago.js';

const mainStyle = {
}

const buttonBaseStyle = {
  display: 'block',
  width: '100%',
  padding: '.5em 0',
  marginTop: '1em'
}

const itemStyle = {
  margin: '.5em auto',
  padding: '1em .5em',
  boxShadow: '0 0 4px #999, 0 2px 2px #999',
  whiteSpace: 'pre',
  overflowY: 'auto',
  maxWidth: '95vw'
}

const itemGroupTitleStyle = {
  textTransform: 'uppercase',
  fontSize: 'small',
  fontWeight: 'bold',
  color: '#999',
  padding: '1em .5em',
  margin: '1em 0'
}

class IndexPage extends PureComponent {
  handleButtonLoadMoreClick(e) {
    this.context.handler({action: 'loadmore'});
  }

  render() {
    const {
      items,
      loading,
      hasMore
    } = this.props;

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
      <Link to='/add'>
        加
      </Link>
    );

    const buttonLoadMore = (
      <button type='button'
        style={buttonStyle}
        disabled={!hasMore}
        onClick={e => this.handleButtonLoadMoreClick(e)}>
        {(loading) ? '等陣' : (hasMore) ? '更多' : '無喇'}
      </button>
    );

    const selectNodeText = (e)=> {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(e.target);
      selection.removeAllRanges();
      selection.addRange(range);

      if (document.queryCommandSupported('copy')) {
        document.execCommand('copy');
      }
    };

    const Item = ({text})=> (
      <p style={itemStyle}
        onClick={selectNodeText}>
        <AutoLinkText text={text} />
      </p>
    );

    const ItemGroup = ({items})=> (
      <div>
        {
          items.map((item)=> {
            return (
              <div key={item._id}>
                <Item text={item.value} />
              </div>
            )
          })
        }
      </div>
    );

    const ItemGroupTitle = ({name})=> (
      <div style={itemGroupTitleStyle}>{name}</div>
    );

    const ItemList = ({items})=> {
      const timeagoInstance = timeago();
      let itemGroups = groupBy(items, (item)=> timeagoInstance.format(item.createdAt));
      return (
        <section>
          {
            Object.keys(itemGroups).map((key)=> {
              return (
                <section key={key}>
                  <ItemGroupTitle name={key} />
                  <ItemGroup items={itemGroups[key]} />
                </section>
              )
            })
          }
        </section>
      );
    };

    return (
      <div>
        <AppBar title='貼三'
          afterTitleNode={buttonAdd} />
        <main style={mainStyle}>
          <ItemList items={items} />
          {buttonLoadMore}
        </main>
      </div>
    );
  }
}

IndexPage.contextTypes = {
  hoodie: PropTypes.object,
  colorScheme: PropTypes.shape({
    primary: PropTypes.string.isRequired,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
  }),
  handler: PropTypes.func.isRequired
}

export default IndexPage;
