
const initialState = []

const playlistReducer = (previousState = initialState, { type, payload }) => {
  switch (type) {
    case 'load_playlist':
      return payload;
    default:
      return previousState;
  }
};

export default playlistReducer;