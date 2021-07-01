import { combineReducers } from 'redux';

import articlesReducer from './articles-reducer';
import pageReducer from './page-reducer';
import loadingReducer from './loading-reducer';
import errorReducer from './error-reducer';
import signUpReducer from './signup-reducer';
import logInReducer from './login-reducer';
import currentUserReducer from './currentuser-reducer';
import serverErrorsReducer from './servererrors-reducer';

export default combineReducers({
  articlesReducer,
  pageReducer,
  loadingReducer,
  errorReducer,
  signUpReducer,
  logInReducer,
  currentUserReducer,
  serverErrorsReducer,
});
