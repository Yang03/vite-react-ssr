
const initialState = []

const recommendReducer = (previousState = initialState, { type, payload }) => {
  switch (type) {
    case 'load_recommend':
      return payload;
    default:
      return previousState;
  }
};

export default recommendReducer;