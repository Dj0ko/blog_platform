const tagsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TAG':
      return [action.payload, ...state];

    case 'REMOVE_TAG':
      return [...state.slice(0, action.payload), ...state.slice(action.payload + 1)];

    default:
      return state;
  }
};

export default tagsReducer;
