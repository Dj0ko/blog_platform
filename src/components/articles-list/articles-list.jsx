import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import ArticleHeader from '../article-header/article-header';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';

import { changePage, hasSpinner } from '../../redux/actions/actions';

import classes from './articles-list.module.scss';
import './pagination.scss';

const ArticlesList = ({ articlesList, onChangePage, currentPage, error }) => {
  const { articles, articlesCount } = articlesList;

  if (error) {
    return <ErrorMessage />;
  }

  if (!articles) {
    return <Spinner />;
  }

  const allArticles = articles.map((article, id) => (
    <li
      className={`${classes['articles-list__item']} ${classes.article}`}
      key={`${article.title + article.author.username + article.createdAt}`}
    >
      <ArticleHeader article={article} id={id} />
    </li>
  ));

  return (
    <>
      <ul className={classes['articles-list']}>{allArticles}</ul>
      <Pagination
        current={currentPage}
        onChange={(page) => onChangePage(page)}
        total={articlesCount / articles.length}
        defaultPageSize="5"
        className={classes['articles-list__pagination']}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  articlesList: state.articlesReducer,
  currentPage: state.pageReducer,
  loadingState: state.loadingReducer,
  error: state.errorReducer,
});

const mapDispatchToProps = (dispatch) => ({
  onChangePage: (page) => {
    dispatch(hasSpinner(true));
    dispatch(changePage(page));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);

ArticlesList.defaultProps = {
  articlesList: [],
  onChangePage: () => {},
  currentPage: 1,
  error: false,
};

ArticlesList.propTypes = {
  articlesList: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.objectOf)])),
  onChangePage: PropTypes.func,
  currentPage: PropTypes.number,
  error: PropTypes.bool,
};
