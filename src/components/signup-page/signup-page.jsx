import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import realWorldDbService from '../../services/services';

import * as actions from '../../redux/actions/actions';
import classes from './signup-page.module.scss';

const SignUpPage = ({ signIn, isLoggedIn }) => {
  // Деструктурируем useForm()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onSubmit' });

  const [serverErrors, setServerErrors] = useState({});

  // Переходим на страницу статей, если успешно прошли регистрацию
  if (isLoggedIn) {
    return <Redirect to="/articles/" />;
  }

  // Отправляем форму и проверяем на наличие ошибок от сервера
  const onSubmit = (data) => {
    realWorldDbService
      .registrationNewUser(data)
      .then((body) => {
        if (body.errors) {
          setServerErrors(body.errors);
        } else {
          localStorage.setItem('user', JSON.stringify(body.user));
          localStorage.setItem('signIn', true);
          signIn(true);
        }
      })
      .catch(() => setServerErrors('invalid'));
  };

  // Деструктурируем ошибки
  // const { email, username } = serverErrors;

  return (
    <section className={classes['signup-page']}>
      <h2 className={classes['signup-page__title']}>Create new account</h2>
      <form
        className={classes.form}
        method="POST"
        action="https://cirosantilli-realworld-express.herokuapp.com/api/users"
        onSubmit={handleSubmit(onSubmit)}
      >
        <fieldset className={classes.form__fieldset}>
          <label className={classes.form__field}>
            <span>Username</span>
            <input
              className={classes.form__input}
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              {...register('username', { required: true, minLength: 3, maxLength: 20 })}
            />
            {errors.username && (
              <p className={classes.form__error}>Your username needs to be from 3 to 20 characters.</p>
            )}
            {/* {username && <p className={classes.form__error}>This username has already use.</p>} */}
          </label>

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
            {/* {email && <p className={classes.form__error}>This email has already use.</p>} */}
            {serverErrors === 'invalid' && (
              <p className={classes.form__error}>Probably, this username or this email has already use.</p>
            )}
          </label>

          <label className={classes.form__field}>
            <span>Password</span>
            <input
              className={classes.form__input}
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              {...register('password', { required: true, minLength: 8, maxLength: 40 })}
            />
            {errors.password && (
              <p className={classes.form__error}>Your password needs to be from 6 to 40 characters.</p>
            )}
          </label>

          <label className={classes.form__field}>
            <span>Repeat Password</span>
            <input
              className={classes.form__input}
              type="password"
              id="repeatPassword"
              name="repeatPassword"
              placeholder="Password"
              {...register('repeatPassword', {
                required: true,
                validate: (value) => {
                  if (value === watch('password')) {
                    return true;
                  }
                  return 'The passwords do not match';
                },
              })}
            />
            {errors.repeatPassword && <p className={classes.form__error}>The passwords do not match.</p>}
          </label>
        </fieldset>

        <label>
          <input
            type="checkbox"
            id="agreeCheckbox"
            name="agreeCheckbox"
            {...register('checkbox', { required: true })}
          />
          <span className={classes.form__text}>I agree to the processing of my personal information</span>
          {errors.checkbox && (
            <p className={classes.form__error}>You have to agree to the processing of your personal information.</p>
          )}
        </label>

        <button type="submit" className={classes.form__button}>
          Create
        </button>
      </form>
      <p className={classes['signup-page__text']}>
        Already have an account?
        <Link to="/sign-in" className={classes['signup-page__text--margin-left']}>
          Sign In
        </Link>
      </p>
    </section>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.logIn,
});

export default connect(mapStateToProps, actions)(SignUpPage);

SignUpPage.defaultProps = {
  signIn: () => {},
  isLoggedIn: false,
};

SignUpPage.propTypes = {
  signIn: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};
