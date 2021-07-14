
const initialState: any = []

const recommendReducer = (previousState = initialState, action:{ type: string, payload: any}) => {
  switch (action.type) {
    case 'load_recommend':
      return action.payload;
    default:
      return previousState;
  }
};

export default recommendReducer;