const articlesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ARTICLES_FETCH_DATA_SUCCESS':
      return { ...state, ...action.articles };

    case 'ADD_NEW_ARTICLE':
      return { articles: [action.payload, ...state.articles], articlesCount: state.articlesCount };

    default:
      return state;
  }
};

export default articlesReducer;
