import { combineReducers } from 'redux';

import articlesReducer from './articles-reducer';
import pageReducer from './page-reducer';

export default combineReducers({
  articlesReducer,
  pageReducer,
});
