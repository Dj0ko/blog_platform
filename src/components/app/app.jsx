import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import realWorldDbService from '../../services/services';
import PageHeader from '../page-header/page-header';
import ArticlesList from '../articles-list/articles-list';
import ArticlePage from '../article-page/article-page';
import SignUpPage from '../signup-page/signup-page';
import SignInPage from '../signin-page/signin-page';
import Profile from '../profile/profile';
import NewArticle from '../new-article/new-article';
import Spinner from '../spinner/spinner';
import { articlesFetchDataSuccess, hasSpinner, hasError } from '../../redux/actions/actions';

import classes from './app.module.scss';

const App = ({ articlesFetchData, currentPage, loadingState, isLoggedIn }) => {
  // Функция обновления компонента
  useEffect(() => articlesFetchData(currentPage), [articlesFetchData, currentPage]);

  return (
    <Router>
      <PageHeader />
      <main className={classes['page-main']}>
        <Route path="/" render={() => (loadingState ? <Spinner /> : <ArticlesList />)} exact />
        <Route path="/articles/" render={() => (loadingState ? <Spinner /> : <ArticlesList />)} exact />
        <Route path="/articles/:id" render={({ match }) => <ArticlePage itemId={match.params.id} />} exact />
        <Route path="/articles/:id/edit" render={({ match }) => <NewArticle itemId={match.params.id} />} />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/profile" component={Profile} />
        <Route path="/new-article" render={() => (isLoggedIn ? <NewArticle /> : <Redirect to="/sign-in" />)} />
      </main>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  currentPage: state.pageReducer,
  loadingState: state.loadingReducer,
  isLoggedIn: state.logInReducer,
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
  isLoggedIn: false,
};

App.propTypes = {
  articlesFetchData: PropTypes.func,
  currentPage: PropTypes.number,
  loadingState: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};
