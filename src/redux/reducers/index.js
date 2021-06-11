import { combineReducers } from 'redux';

import articlesReducer from './articles-reducer';
import pageReducer from './page-reducer';
import loadingReducer from './loading-reducer';
import errorReducer from './error-reducer';

export default combineReducers({
  articlesReducer,
  pageReducer,
  loadingReducer,
  errorReducer,
});
