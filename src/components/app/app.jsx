import React from 'react';
import ArticlesList from '../articles-list/articles-list';

import classes from './app.module.scss';

const App = () => (
  <>
    <header className={classes['page-header']}>
      <h1 className={classes.title}>Realworld Blog</h1>
      <div className={classes['page-header__button-container']}>
        <button type="button" className={`${classes.header__button} ${classes.button}`}>
          Sign In
        </button>
        <button type="button" className={`${classes.header__button} ${classes.button} ${classes['button--active']}`}>
          Sign Up
        </button>
      </div>
    </header>
    <main className={classes['page-main']}>
      <ArticlesList />
    </main>
  </>
);

export default App;
