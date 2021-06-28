import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import realWorldDbService from '../../services/services';
import ArticlesList from '../articles-list/articles-list';
import ArticlePage from '../article-page/article-page';
import SignUp from '../sign-up/sign-up';
import SignIn from '../sign-in/sign-in';
import Spinner from '../spinner/spinner';
import { articlesFetchDataSuccess, hasSpinner, hasError } from '../../redux/actions/actions';

import classes from './app.module.scss';

const App = ({ articlesFetchData, currentPage, loadingState }) => {
  // Функция обновления компонента
  useEffect(() => articlesFetchData(currentPage), [articlesFetchData, currentPage]);

  return (
    <Router>
      <header className={classes['page-header']}>
        <Link to="/">
          <h1 className={classes.title}>Realworld Blog</h1>
        </Link>
        <div className={classes['page-header__button-container']}>
          <Link to="/sign-in" className={`${classes.header__button} ${classes.button}`}>
            Sign In
          </Link>
          <Link to="/sign-up" className={`${classes.header__button} ${classes.button} ${classes['button--active']}`}>
            Sign Up
          </Link>
        </div>
      </header>
      <main className={classes['page-main']}>
        <Route path="/" render={() => (loadingState ? <Spinner /> : <ArticlesList />)} exact />
        <Route path="/article/" render={() => (loadingState ? <Spinner /> : <ArticlesList />)} exact />
        <Route path="/article/:id" render={({ match }) => <ArticlePage itemId={match.params.id} />} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/sign-in" component={SignIn} />
      </main>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  currentPage: state.pageReducer,
  loadingState: state.loadingReducer,
});

const mapDispatchToProps = (dispatch) => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.defaultProps = {
  articlesFetchData: () => {},
  currentPage: 1,
  loadingState: false,
};

App.propTypes = {
  articlesFetchData: PropTypes.func,
  currentPage: PropTypes.number,
  loadingState: PropTypes.bool,
};
