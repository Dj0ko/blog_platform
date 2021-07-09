import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import realWorldDbService from '../../services/services';

import * as actions from '../../redux/actions/actions';
import classes from './sign-in.module.scss';

const SignIn = ({ isLoggedIn, getServerErrors, serverErrors, signIn, setCurrentUser }) => {
  // Деструктурируем useForm()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  // Если логин прошел удачно, то переходим на страницу статей
  if (isLoggedIn) {
    return <Redirect to="/article/" />;
  }

  // Отправляем форму и проверяем на наличие ошибок от сервера
  const onSubmit = (data) => {
    realWorldDbService.loginUser(data).then((body) => {
      if (body.errors) {
        getServerErrors(body.errors);
      } else {
        sessionStorage.setItem('user', JSON.stringify(body.user));
        sessionStorage.setItem('signIn', true);
        setCurrentUser(body.user);
        signIn(true);
      }
    });
  };

  return (
    <section className={classes['sign-in']}>
      <h2 className={classes['sign-in__title']}>Sign In</h2>
      <form
        className={classes.form}
        method="POST"
        action="https://conduit.productionready.io/api/users/login"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className={classes.form__fieldset}>
          <label className={classes.form__field}>
            <span>Email address</span>
            <input
              className={classes.form__input}
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
            />
            {errors.email && <p className={classes.form__error}>Your mail must be a correct post address.</p>}
          </label>

          <label className={classes.form__field}>
            <span>Password</span>
            <input
              className={classes.form__input}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              {...register('password', { required: true, minLength: 6, maxLength: 40 })}
            />
            {errors.password && (
              <p className={classes.form__error}>Your password needs to be from 6 to 40 characters.</p>
            )}
            {serverErrors['email or password'] && <p className={classes.form__error}>Invalid login or password.</p>}
          </label>
        </fieldset>
        <button type="submit" className={classes.form__button}>
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
  serverErrors: state.serverErrorsReducer,
  isLoggedIn: state.logInReducer,
});

export default connect(mapStateToProps, actions)(SignIn);

SignIn.defaultProps = {
  isLoggedIn: false,
  getServerErrors: () => {},
  serverErrors: {},
  signIn: () => {},
  setCurrentUser: () => {},
};

SignIn.propTypes = {
  isLoggedIn: PropTypes.bool,
  getServerErrors: PropTypes.func,
  serverErrors: PropTypes.objectOf(PropTypes.objectOf),
  signIn: PropTypes.func,
  setCurrentUser: PropTypes.func,
};