import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import { withRouter } from 'react-router-dom';
import Article from '../article/article';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../error-message/error-message';

import { articlesFetchDataSuccess, hasError, changePage, hasSpinner } from '../../redux/actions/actions';

import realWorldDbService from '../../services/services';
import classes from './articles-list.module.scss';
import './pagination.scss';

const ArticlesList = ({ articlesFetchData, articlesList, onChangePage, currentPage, error, location }) => {
  // Функция обновления компонента
  useEffect(() => articlesFetchData(currentPage), [articlesFetchData, currentPage, location.pathname]);

  const { articles, articlesCount } = articlesList;

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
        current={currentPage}
        onChange={(page) => {
          onChangePage(page);
          articlesFetchData(page);
        }}
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
  error: state.errorReducer,
});

const mapDispatchToProps = (dispatch) => ({
  onChangePage: (page) => {
    dispatch(hasSpinner(true));
    dispatch(changePage(page));
  },
  articlesFetchData: (offSet) =>
    realWorldDbService
      .getArticlesList(offSet)
      .then((data) => {
        if (!data) {
          dispatch(hasSpinner(true));
        }
        dispatch(hasSpinner(false));
        dispatch(articlesFetchDataSuccess(data));
      })
      .catch(() => dispatch(hasError(true))),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ArticlesList));

ArticlesList.defaultProps = {
  articlesFetchData: () => {},
  articlesList: [],
  onChangePage: () => {},
  currentPage: 1,
  error: false,
};

ArticlesList.propTypes = {
  articlesFetchData: PropTypes.func,
  articlesList: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.objectOf)])),
  onChangePage: PropTypes.func,
  currentPage: PropTypes.number,
  error: PropTypes.bool,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};
