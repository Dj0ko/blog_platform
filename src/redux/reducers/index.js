import { combineReducers } from 'redux';

import articlesReducer from './articles-reducer';
import pageReducer from './page-reducer';
import loadingReducer from './loading-reducer';
import errorReducer from './error-reducer';
import userDataReducer from './userdata-reducer';
import signUpReducer from './signup-reducer';
import signInReducer from './signin-reducer';

export default combineReducers({
  articlesReducer,
  pageReducer,
  loadingReducer,
  errorReducer,
  userDataReducer,
  signUpReducer,
  signInReducer,
});
