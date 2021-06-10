const pageReducer = (state = 1, action) => {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return action.page;

    default:
      return state;
  }
};

export default pageReducer;
