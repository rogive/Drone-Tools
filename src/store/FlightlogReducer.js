const CHANGE_TEXT = 'CHANGE_TEXT';

export function changeText(text) {
  return {
    type: CHANGE_TEXT,
    payload: text,
  };
}

const initialState = {
  text: '',
};

export function textReducer(state = initialState, action) {
  switch(action.type) {
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.payload,
      };
    default:
      return state;
  }
}
