import * as types from './actionTypes';

const defaultState = {
  map: { x: 0, y: 0, scents: {} },
  robot: {},
  output: [],
};

const reducer = (state = defaultState, action) => {
  const { type, data } = action;

  switch (type) {
    case types.ACTION:
      return {
        ...state,
        data,
      };

    default:
      return state;
  }
};

export default reducer;
