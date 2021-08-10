import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as actions from '../../redux/actions/actions';
import classes from './page-header.module.scss';

const PageHeader = ({ isLoggedIn, signIn, currentUser }) => {
  // Устанавливаем флаг, что мы залогинены при перезагрузке страницы
  useEffect(() => signIn(localStorage.getItem('signIn')), [signIn]);

  // Если мы залогинены, то получаем данные нынешнего пользователя
  if (isLoggedIn || (localStorage.getItem('signIn') && localStorage.getItem('signIn') !== 'false')) {
    const userData = () => {
      if (JSON.stringify(currentUser).length === 2) {
        return JSON.parse(localStorage.getItem('user'));
      }
      return currentUser;
    };

    // Достаём имя и аватар из данных пользователя
    const { username, image } = userData();

    // Рендерим, если залогинены
    return (
      <header className={classes['page-header']}>
        <Link to="/">
          <h1 className={classes.title}>Realworld Blog</h1>
        </Link>
        <div>
          <Link
            to="/new-article"
            type="button"
            className={`${classes.button} ${classes['button--green']} ${classes['button--loggedin']}`}
          >
            Create article
          </Link>
          <Link to="/profile">
            <span className={classes.user__text}>{username}</span>
            <img src={image} className={classes.user__image} width="46px" height="46px" alt="user avatar" />
          </Link>
          <button
            type="button"
            className={`${classes['page-header__button']} ${classes.button} ${classes['button--gray']}`}
            onClick={() => {
              signIn(false);
              localStorage.clear();
            }}
          >
            Log Out
          </button>
        </div>
      </header>
    );
  }

  // Рендерим, если не залогинены
  return (
    <header className={classes['page-header']}>
      <Link to="/">
        <h1 className={classes.title}>Realworld Blog</h1>
      </Link>
      <div className={classes['page-header__button-container']}>
        <Link to="/sign-in" className={`${classes['page-header__button']} ${classes.button}`}>
          Sign In
        </Link>
        <Link
          to="/sign-up"
          className={`${classes['page-header__button']} ${classes.button} ${classes['button--green']}`}
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.logInReducer,
  currentUser: state.currentUserReducer,
});

export default connect(mapStateToProps, actions)(PageHeader);

PageHeader.defaultProps = {
  isLoggedIn: false,
  signIn: () => {},
  currentUser: {},
};

PageHeader.propTypes = {
  isLoggedIn: PropTypes.bool,
  signIn: PropTypes.func,
  currentUser: PropTypes.objectOf(PropTypes.objectOf),
};
