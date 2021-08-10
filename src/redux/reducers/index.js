import { combineReducers } from 'redux';

import articlesReducer from './articles-reducer';
import errorReducer from './error-reducer';
import signUpReducer from './signup-reducer';
import logInReducer from './login-reducer';
import currentUserReducer from './currentuser-reducer';
import serverErrorsReducer from './servererrors-reducer';
import tagsReducer from './tags-reducer';
import currentArticleReducer from './currentarticle-reducer';
import modalReducer from './modal-reducer';

export default combineReducers({
  articlesReducer,
  errorReducer,
  signUpReducer,
  logInReducer,
  currentUserReducer,
  serverErrorsReducer,
  tagsReducer,
  currentArticleReducer,
  modalReducer,
});
