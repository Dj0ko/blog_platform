import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import realWorldDbService from '../../services/services';

import * as actions from '../../redux/actions/actions';
import classes from './sign-in.module.scss';

const SignIn = ({ changeUserdata, userData, signIn, isLoggedIn }) => {
  if (isLoggedIn) {
    return <Redirect to="/article/" />;
  }

  const handleCnahge = (evt) => {
    switch (evt.target.id) {
      case 'email':
        return changeUserdata('SET_EMAIL', evt.target.value);

      case 'password':
        return changeUserdata('SET_PASSWORD', evt.target.value);

      default:
        return '';
    }
  };

  return (
    <section className={classes['sign-in']}>
      <h2 className={classes['sign-in__title']}>Sign In</h2>
      <form className={classes.form} method="POST" action="https://conduit.productionready.io/api/users/login">
        <fieldset className={classes.form__fieldset}>
          <label className={classes.form__field}>
            <span>Email address</span>
            <input
              className={classes.form__input}
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              onChange={handleCnahge}
            />
          </label>

          <label className={classes.form__field}>
            <span>Password</span>
            <input
              className={classes.form__input}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleCnahge}
            />
          </label>
        </fieldset>
        <button
          type="button"
          className={classes.form__button}
          onClick={() => {
            realWorldDbService.loginUser(userData);
            signIn(true);
          }}
        >
          Login
        </button>
      </form>
      <p className={classes['sign-in__text']}>
        Don’t have an account?
        <Link to="/sign-up" className={classes['sign-in__text--margin-left']}>
          Sign Up
        </Link>
      </p>
    </section>
  );
};

const mapStateToProps = (state) => ({
  userData: {
    user: state.userDataReducer,
  },
  isLoggedIn: state.signInReducer,
});

export default connect(mapStateToProps, actions)(SignIn);

SignIn.defaultProps = {
  changeUserdata: () => {},
  userData: {},
  signIn: () => {},
  isLoggedIn: false,
};

SignIn.propTypes = {
  changeUserdata: PropTypes.func,
  userData: PropTypes.objectOf(PropTypes.objectOf),
  signIn: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};
