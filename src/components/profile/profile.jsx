import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import realWorldDbService from '../../services/services';

import * as actions from '../../redux/actions/actions';
import classes from './profile.module.scss';

const Profile = ({ getServerErrors, setCurrentUser, currentUser, serverErrors, isLoggedIn }) => {
  // Функция, возвращающая нам нынешнего пользователя(если не удается определить пользователя, то пользуемся кешом localStorage)
  const userData = () => {
    if (JSON.stringify(currentUser).length === 2) {
      return JSON.parse(localStorage.getItem('user'));
    }
    return currentUser;
  };

  // Получаем имя пользователя, email и token
  const { username, email, token } = userData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  // Отправляем форму с измененными данными
  const onSubmit = (data) => {
    const newObj = {};

    for (const key in data) {
      if (data[key] !== currentUser[key] && data[key]) {
        newObj[key] = data[key];
      }
    }

    realWorldDbService.editProfile(newObj, token).then((body) => {
      if (body.errors) {
        getServerErrors(body.errors);
      } else {
        localStorage.setItem('user', JSON.stringify(body.user));
        setCurrentUser(body.user);
      }
    });
  };

  // Деструктурируем ошибки
  const { email: errorEmail, username: errorUserName } = serverErrors;

  // Возвращаемся на главную страницу, если сделали Log Out
  if (!isLoggedIn) {
    return <Redirect to="/articles/" />;
  }

  return (
    <section className={classes.profile}>
      <h2 className={classes.profile__title}>Edit Profile</h2>
      <form
        className={classes.form}
        method="PUT"
        action="https://conduit.productionready.io/api/users"
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
            {errorUserName && <p className={classes.form__error}>This username has already use.</p>}
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
            {errorEmail && <p className={classes.form__error}>This email has already use.</p>}
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
  isLoggedIn: state.logInReducer,
  currentUser: state.currentUserReducer,
  serverErrors: state.serverErrorsReducer,
});

export default connect(mapStateToProps, actions)(Profile);

Profile.defaultProps = {
  getServerErrors: () => {},
  serverErrors: {},
  currentUser: {},
  setCurrentUser: () => {},
  isLoggedIn: false,
};

Profile.propTypes = {
  getServerErrors: PropTypes.func,
  serverErrors: PropTypes.objectOf(PropTypes.objectOf),
  currentUser: PropTypes.objectOf(PropTypes.objectOf),
  setCurrentUser: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};
