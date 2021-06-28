/* eslint-disable no-unused-vars */
import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import realWorldDbService from '../../services/services';

import * as actions from '../../redux/actions/actions';
import classes from './sign-up.module.scss';

const SignUp = ({ changeUserdata, signUp, userData, isSignedUp, clearData }) => {
  if (isSignedUp) {
    return <Redirect to="/sign-in" />;
  }

  const handleCnahge = (evt) => {
    switch (evt.target.id) {
      case 'username':
        return changeUserdata('SET_USERNAME', evt.target.value);

      case 'email':
        return changeUserdata('SET_EMAIL', evt.target.value);

      case 'password':
        return changeUserdata('SET_PASSWORD', evt.target.value);

      default:
        return '';
    }
  };

  return (
    <section className={classes['sign-up']}>
      <h2 className={classes['sign-up__title']}>Create new account</h2>
      <form className={classes.form} method="POST" action="https://conduit.productionready.io/api/users">
        <fieldset className={classes.form__fieldset}>
          <label className={classes.form__field}>
            <span>Username</span>
            <input
              className={classes.form__input}
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              onChange={handleCnahge}
            />
          </label>

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

          <label className={classes.form__field}>
            <span>Repeat Password</span>
            <input
              className={classes.form__input}
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              placeholder="Password"
            />
          </label>
        </fieldset>

        <label>
          <input type="checkbox" id="agreeCheckbox" name="agreeCheckbox" />
          <span className={classes.form__text}>I agree to the processing of my personal information</span>
        </label>

        <button
          type="button"
          className={classes.form__button}
          onClick={() => {
            realWorldDbService.registrationNewUser(userData);
            signUp(true);
            clearData();
          }}
        >
          Create
        </button>
      </form>
      <p className={classes['sign-up__text']}>
        Already have an account?
        <Link to="/sign-in" className={classes['sign-up__text--margin-left']}>
          Sign In
        </Link>
      </p>
    </section>
  );
};

const mapStateToProps = (state) => ({
  userData: {
    user: state.userDataReducer,
  },
  isSignedUp: state.signUpReducer,
});

export default connect(mapStateToProps, actions)(SignUp);

SignUp.defaultProps = {
  changeUserdata: () => {},
  signUp: () => {},
  userData: {},
  isSignedUp: false,
  clearData: () => {},
};

SignUp.propTypes = {
  changeUserdata: PropTypes.func,
  signUp: PropTypes.func,
  userData: PropTypes.objectOf(PropTypes.objectOf),
  isSignedUp: PropTypes.bool,
  clearData: PropTypes.func,
};
