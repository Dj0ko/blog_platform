import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './header.module.scss';

const Header = ({ isLoggedIn, userInfo }) => {
  const { username, image } = userInfo;

  if (isLoggedIn) {
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
          <span className={classes.user__text}>{username}</span>
          <img src={image} className={classes.user__image} width="46px" height="46px" alt="users avatar" />
          <button
            type="button"
            className={`${classes['page-header__button']} ${classes.button} ${classes['button--gray']}`}
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
  userInfo: state.currentUserReducer.user,
});

export default connect(mapStateToProps, null)(Header);

Header.defaultProps = {
  isLoggedIn: false,
  userInfo: {},
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
  userInfo: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
};
