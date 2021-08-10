import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import PageHeader from '../page-header/page-header';
import ArticlesList from '../articles-list/articles-list';
import ArticlePage from '../article-page/article-page';
import SignUpPage from '../signup-page/signup-page';
import SignInPage from '../signin-page/signin-page';
import Profile from '../profile/profile';
import NewArticle from '../new-article/new-article';
import Spinner from '../spinner/spinner';

import classes from './app.module.scss';

const App = ({ loadingState, isLoggedIn }) => (
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
      <Route path="/new-article" render={() => (isLoggedIn ? <NewArticle /> : <Redirect to="/sign-in" />)} exact />
    </main>
  </Router>
);

const mapStateToProps = (state) => ({
  loadingState: state.loadingReducer,
  isLoggedIn: state.logInReducer,
});

export default connect(mapStateToProps, null)(App);

App.defaultProps = {
  loadingState: false,
  isLoggedIn: false,
};

App.propTypes = {
  loadingState: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};
