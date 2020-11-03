const INCREASE_COUNT = 'INCREASE_COUNT';
const DECREASE_COUNT = 'DECREASE_COUNT';

export function increaseCount(increaseBy) {
  return {
    type: INCREASE_COUNT,
    payload: increaseBy
  };
}

export function decreaseCount() {
  return {
    type: DECREASE_COUNT,
  };
}

const initialState = {
  count: 0,
};

export function countReducer(state = initialState, action) {
  switch(action.type) {
    case INCREASE_COUNT:
      console.log('increasing count....')
      return {
        ...state,
        count: state.count + action.payload,
      };
    case DECREASE_COUNT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}
