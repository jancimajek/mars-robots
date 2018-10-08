import * as types from './actionTypes';

const defaultState = {
  map: { x: 0, y: 0 },
  scents: {},
  robot: {},
  output: [],
};

const reducer = (state = defaultState, action) => {
  const {
    type, x, y, orientation, heading, lost,
  } = action;

  switch (type) {
    case types.INIT_MAP:
      return {
        ...state,
        map: { x, y },
      };

    case types.ADD_SCENT:
      return {
        ...state,
        scents: {
          ...state.scents,
          [x]: {
            ...state.scents[x],
            [y]: true,
          },
        },
      };

    case types.PLACE_ROBOT:
      return {
        ...state,
        robot: {
          x: parseInt(x, 10),
          y: parseInt(y, 10),
          orientation,
          lost: false,
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

    case types.ADD_OUTPUT:
      return {
        ...state,
        output: [
          ...state.output,
          {
            x, y, heading, lost,
          },
        ],
      };

    default:
      return state;
  }
};

export default reducer;
