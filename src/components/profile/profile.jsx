import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import realWorldDbService from '../../services/services';

import * as actions from '../../redux/actions/actions';
import classes from './profile.module.scss';

const Profile = ({ setCurrentUser, currentUser, isLoggedIn }) => {
  // Функция, возвращающая нам нынешнего пользователя(если не удается определить пользователя, то пользуемся кешом localStorage)
  const userData = () => {
    if (JSON.stringify(currentUser).length === 2) {
      return JSON.parse(localStorage.getItem('user'));
    }
    return currentUser;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const [serverErrors, setServerErrors] = useState({});

  // Отправляем форму с измененными данными
  const onSubmit = (data) => {
    const newObj = {};

    for (const key in data) {
      if (data[key] !== currentUser[key] && data[key]) {
        newObj[key] = data[key];
      }
    }

    realWorldDbService.editProfile(newObj).then((body) => {
      if (body.errors) {
        setServerErrors(body.errors);
      } else {
        localStorage.setItem('user', JSON.stringify(body.user));
        setCurrentUser(body.user);
      }
    });
  };

  // Возвращаемся на главную страницу, если сделали Log Out
  if (!isLoggedIn) {
    return <Redirect to="/articles/" />;
  }

  // Получаем имя пользователя, email
  const { username, email } = userData();
  // const { username, email } = JSON.parse(localStorage.getItem('user'));

  return (
    <section className={classes.profile}>
      <h2 className={classes.profile__title}>Edit Profile</h2>
      <form
        className={classes.form}
        method="PUT"
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
              defaultValue={username}
              {...register('username', { required: true, minLength: 3, maxLength: 20 })}
            />
            {errors.username && (
              <p className={classes.form__error}>Your username needs to be from 3 to 20 characters.</p>
            )}
            {serverErrors[0] === 'username must be unique' && (
              <p className={classes.form__error}>This username has already use.</p>
            )}
          </label>

          <label className={classes.form__field}>
            <span>Email address</span>
            <input
              className={classes.form__input}
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              defaultValue={email}
              {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
            />
            {errors.email && <p className={classes.form__error}>Your mail must be a correct post address.</p>}
            {serverErrors[0] ===
              'Oops. Looks like you already have an account with this email address. Please try to login.' && (
              <p className={classes.form__error}>
                Oops. Looks like you already have an account with this email address. Please try to login.
              </p>
            )}
          </label>

          <label className={classes.form__field}>
            <span>Password</span>
            <input
              className={classes.form__input}
              type="password"
              id="password"
              name="password"
              placeholder="New password"
              {...register('password', { minLength: 8, maxLength: 40 })}
            />
            {errors.password && (
              <p className={classes.form__error}>Your password needs to be from 8 to 40 characters.</p>
            )}
          </label>

          <label className={classes.form__field}>
            <span>Avatar image (url)</span>
            <input
              className={classes.form__input}
              type="text"
              id="Avatar image (url)"
              name="image"
              placeholder="Avatar image"
              {...register('image')}
            />
            {errors.repeatPassword && <p className={classes.form__error}>The passwords do not match.</p>}
          </label>
        </fieldset>

        <button type="submit" className={classes.form__button}>
          Save
        </button>
      </form>
    </section>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.logIn,
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, actions)(Profile);

Profile.defaultProps = {
  currentUser: {},
  setCurrentUser: () => {},
  isLoggedIn: false,
};

Profile.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.objectOf),
  setCurrentUser: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};
