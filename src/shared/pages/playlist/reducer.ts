
const initialState:any = []

const playlistReducer = (previousState = initialState, action:{ type: string, payload: any}) => {
  switch (action.type) {
    case 'load_playlist':
      return action.payload;
    default:
      return previousState;
  }
};

export default playlistReducer;