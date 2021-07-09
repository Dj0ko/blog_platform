import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as actions from '../../redux/actions/actions';
import classes from './header.module.scss';

const Header = ({ isLoggedIn, signIn, currentUser }) => {
  useEffect(() => signIn(sessionStorage.getItem('signIn')));
  if (isLoggedIn || (sessionStorage.getItem('signIn') && sessionStorage.getItem('signIn') !== 'false')) {
    const userData = () => {
      if (JSON.stringify(currentUser).length === 2) {
        return JSON.parse(sessionStorage.getItem('user'));
      }
      return currentUser;
    };

    const { username, image } = userData();

    return (
      <header className={classes['page-header']}>
        <Link to="/">
          <h1 className={classes.title}>Realworld Blog</h1>
        </Link>
        <div>
          <button
            type="button"
            className={`${classes.button} ${classes['button--green']} ${classes['button--loggedin']}`}
          >
            Create article
          </button>
          <Link to="/profile">
            <span className={classes.user__text}>{username}</span>
            <img src={image} className={classes.user__image} width="46px" height="46px" alt="user avatar" />
          </Link>
          <button
            type="button"
            className={`${classes['page-header__button']} ${classes.button} ${classes['button--gray']}`}
            onClick={() => {
              signIn(false);
              sessionStorage.clear();
            }}
          >
            Log Out
          </button>
        </div>
      </header>
    );
  }

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

export default connect(mapStateToProps, actions)(Header);

Header.defaultProps = {
  isLoggedIn: false,
  signIn: () => {},
  currentUser: {},
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  signIn: PropTypes.func,
  currentUser: PropTypes.objectOf(PropTypes.objectOf),
};
