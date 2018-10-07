import * as types from './actionTypes';

const defaultState = {
  map: { x: 0, y: 0, scents: {} },
  robot: {},
  output: [],
};

const reducer = (state = defaultState, action) => {
  const { type, x, y } = action;

  switch (type) {
    case types.INIT_MAP:
      return {
        ...state,
        map: { ...state.map, x, y },
      };

    default:
      return state;
  }
};

export default reducer;
