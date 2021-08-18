import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { Pagination } from 'antd';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import realWorldDbService from '../../services/services';

import Article from '../article/article';
import Spinner from '../../pages/spinner/spinner';
import ErrorMessage from '../../pages/error-message/error-message';

import * as actions from '../../redux/actions/actions';
import classes from './articles-list.module.scss';
import './pagination.scss';

const ArticlesList = ({ articlesFetchDataSuccess, articlesList, error, location, hasError, noArticles }) => {
  const [page, setPage] = useState(1);

  const articlesFetchData = useCallback(() => {
    realWorldDbService
      .getArticlesList(page)
      .then((data) => {
        articlesFetchDataSuccess(data);
      })
      .catch(() => {
        hasError(true);
      });
  }, [articlesFetchDataSuccess, hasError, page]);

  useEffect(() => articlesFetchData(), [articlesFetchData, page, location]);

  const { articles } = articlesList;

  if (error) {
    return <ErrorMessage />;
  }

  if (!articles) {
    return <Spinner />;
  }

  const allArticles = articles.map((article) => (
    <Article article={article} key={`${article.title + article.author.username + article.createdAt}`} />
  ));

  return (
    <>
      <ul className={classes['articles-list']}>{allArticles}</ul>
      <Pagination
        current={page}
        onChange={(pageNumber) => {
          noArticles();
          setPage(pageNumber);
        }}
        total={articlesList.articlesCount}
        defaultPageSize="5"
        className={classes['articles-list__pagination']}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  articlesList: state.articles,
  error: state.error,
  isLoggedIn: state.logIn,
});

export default connect(mapStateToProps, actions)(withRouter(ArticlesList));

ArticlesList.defaultProps = {
  articlesList: [],
  error: false,
  articlesFetchDataSuccess: () => {},
  hasError: () => {},
  noArticles: () => {},
};

ArticlesList.propTypes = {
  articlesList: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.objectOf)])),
  error: PropTypes.bool,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  articlesFetchDataSuccess: PropTypes.func,
  hasError: PropTypes.func,
  noArticles: PropTypes.func,
};
