import * as types from './actionTypes';

const defaultState = {
  map: { x: 0, y: 0, scents: {} },
  robot: {},
  output: [],
};

const reducer = (state = defaultState, action) => {
  const {
    type, x, y, orientation,
  } = action;

  switch (type) {
    case types.INIT_MAP:
      return {
        ...state,
        map: { ...state.map, x, y },
      };

    case types.PLACE_ROBOT:
      return {
        ...state,
        robot: {
          x,
          y,
          orientation,
        },
      };

    case types.TURN_ROBOT:
      return {
        ...state,
        robot: {
          ...state.robot,
          orientation,
        },
      };

    case types.MOVE_ROBOT:
      return {
        ...state,
        robot: {
          ...state.robot,
          x,
          y,
        },
      };

    case types.KILL_ROBOT:
      return {
        ...state,
        robot: {
          ...state.robot,
          lost: true,
        },
      };

    default:
      return state;
  }
};

export default reducer;
