import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import Article from '../article/article';
import realWorldDbService from '../../services/services';

import { articlesFetchDataSuccess, changePage } from '../../redux/actions/actions';

import classes from './articles-list.module.scss';
import './pagination.scss';

const ArticlesList = ({ articlesList, articlesFetchData, onChangePage, offSet }) => {
  useEffect(() => articlesFetchData(offSet), [articlesFetchData, offSet]);
  const { articles, articlesCount } = articlesList;

  if (!articles) {
    return <ul className={classes['articles-list']} />;
  }

  const allArticles = articles.map((article) => (
    <Article article={article} key={`${article.title + article.author.username + article.createdAt}`} />
  ));

  return (
    <>
      <ul className={classes['articles-list']}>{allArticles}</ul>
      <Pagination
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
  offSet: state.pageReducer,
});

const mapDispatchToProps = (dispatch) => ({
  articlesFetchData: (offSet) =>
    realWorldDbService.getListArticles(offSet).then((data) => dispatch(articlesFetchDataSuccess(data))),
  onChangePage: (page) => dispatch(changePage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);

ArticlesList.defaultProps = {
  articlesList: [],
  articlesFetchData: () => {},
  onChangePage: () => {},
  offSet: 1,
};

ArticlesList.propTypes = {
  articlesList: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.arrayOf(PropTypes.objectOf)])),
  articlesFetchData: PropTypes.func,
  onChangePage: PropTypes.func,
  offSet: PropTypes.number,
};
