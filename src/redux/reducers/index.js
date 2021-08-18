import { combineReducers } from 'redux';

import articles from './articles';
import error from './error';
import logIn from './login';
import currentUser from './currentuser';

export default combineReducers({
  articles,
  error,
  logIn,
  currentUser,
});
