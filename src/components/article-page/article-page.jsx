import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import ArticleHeader from '../article-header/article-header';

import classes from './article-page.module.scss';

const ArticlePage = ({ articles, itemId }) => {
  if (!articles) {
    return '';
  }

  const articleHeaderStyle = {
    color: 'rgba(0, 0, 0, 0.5)',
    marginBottom: '0',
    filter: 'none',
  };

  const [currentArticle] = articles.filter((article) => article.slug === itemId);

  return (
    <section className={classes['article-page']}>
      <ArticleHeader article={currentArticle} style={articleHeaderStyle} />
      <ReactMarkdown className={classes['article-page__main']}>{currentArticle.slug}</ReactMarkdown>
    </section>
  );
};

const mapStateToProps = (state) => ({
  articles: state.articlesReducer.articles,
});

export default connect(mapStateToProps, null)(ArticlePage);

ArticlePage.defaultProps = {
  articles: [],
};

ArticlePage.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.objectOf),
  itemId: PropTypes.string.isRequired,
};
