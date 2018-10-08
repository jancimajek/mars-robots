import reducer from '../reducer';
import * as types from '../actionTypes';

describe('reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      map: { x: 0, y: 0 },
      scents: {},
      robot: {},
      output: [],
    });
  });

  describe('INIT_MAP', () => {
    it('should initialise the map', () => {
      const [x, y] = [1, 2];
      const rest = {};

      const state = { rest };
      const action = { type: types.INIT_MAP, x, y };
      const expectedState = { rest, map: { x, y } };

      expect(reducer(state, action)).toEqual(expectedState);
    });
  });

  describe('ADD_SCENT', () => {
    it('should add new scent to empty scents', () => {
      const [x, y] = [1, 2];
      const rest = {};

      const state = { rest, scents: {} };
      const action = { type: types.ADD_SCENT, x, y };
      const expectedState = {
        rest,
        scents: { [x]: { [y]: true } },
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });

    it('should keep a scent if already added', () => {
      const [x, y] = [1, 2];
      const rest = {};

      const state = {
        rest,
        scents: { [x]: { [y]: true } },
      };
      const action = { type: types.ADD_SCENT, x, y };
      const expectedState = {
        rest,
        scents: { [x]: { [y]: true } },
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });

    it('should add a scent if different x coordinate', () => {
      const [x, y] = [1, 2];
      const newx = 2;
      const rest = {};

      const state = {
        rest,
        scents: { [x]: { [y]: true } },
      };
      const action = {
        type: types.ADD_SCENT,
        x: newx,
        y,
      };
      const expectedState = {
        rest,
        scents: {
          [x]: {
            [y]: true,
          },
          [newx]: {
            [y]: true,
          },
        },
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });

    it('should add a scent if different y coordinate', () => {
      const [x, y] = [1, 2];
      const newy = 3;
      const rest = {};

      const state = {
        rest,
        scents: { [x]: { [y]: true } },
      };
      const action = {
        type: types.ADD_SCENT,
        x,
        y: newy,
      };
      const expectedState = {
        rest,
        scents: {
          [x]: {
            [y]: true,
            [newy]: true,
          },
        },
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });
  });

  describe('PLACE_ROBOT', () => {
    it('should place a new robot', () => {
      const [x, y, orientation] = [1, 2, 90];
      const rest = {};

      const state = { rest, robot: {} };
      const action = {
        type: types.PLACE_ROBOT, x, y, orientation,
      };
      const expectedState = {
        rest,
        robot: {
          x, y, orientation, lost: false,
        },
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });

    it('should replace an existing robot with a new one', () => {
      const [x, y, orientation] = [1, 2, 90];
      const rest = {};

      const state = {
        rest,
        robot: {
          x: 2, y: 3, orientation: 180, lost: true,
        },
      };
      const action = {
        type: types.PLACE_ROBOT, x, y, orientation,
      };
      const expectedState = {
        rest,
        robot: {
          x, y, orientation, lost: false,
        },
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });

    it('should convert coordinates to numbers', () => {
      const [x, y, orientation] = [1, 2, 90];
      const rest = {};

      const state = { rest, robot: {} };
      const action = {
        type: types.PLACE_ROBOT, x: '1', y: '2', orientation,
      };
      const expectedState = {
        rest,
        robot: {
          x, y, orientation, lost: false,
        },
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });
  });

  describe('TURN_ROBOT', () => {
    it('should turn a robot', () => {
      const [x, y, orientation, lost] = [1, 2, 180, false];
      const rest = {};

      const state = {
        rest,
        robot: {
          x, y, orientation: 90, lost,
        },
      };
      const action = {
        type: types.TURN_ROBOT, orientation,
      };
      const expectedState = {
        rest,
        robot: {
          x, y, orientation, lost,
        },
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });
  });

  describe('MOVE_ROBOT', () => {
    it('should move a robot', () => {
      const [x, y, orientation, lost] = [1, 2, 180, false];
      const rest = {};

      const state = {
        rest,
        robot: {
          x: 0, y: 0, orientation, lost,
        },
      };
      const action = {
        type: types.MOVE_ROBOT, x, y,
      };
      const expectedState = {
        rest,
        robot: {
          x, y, orientation, lost,
        },
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });
  });

  describe('KILL_ROBOT', () => {
    it('should kill a robot', () => {
      const [x, y, orientation, lost] = [1, 2, 180, true];
      const rest = {};

      const state = {
        rest,
        robot: {
          x, y, orientation, lost: false,
        },
      };
      const action = {
        type: types.KILL_ROBOT,
      };
      const expectedState = {
        rest,
        robot: {
          x, y, orientation, lost,
        },
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });
  });

  describe('ADD_OUTPUT', () => {
    it('should add an object to an empty output', () => {
      const [x, y, heading, lost] = [1, 2, 'E', false];
      const rest = {};

      const state = {
        rest,
        output: [],
      };
      const action = {
        type: types.ADD_OUTPUT, x, y, heading, lost,
      };
      const expectedState = {
        rest,
        output: [{
          x, y, heading, lost,
        }],
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });

    it('should add the same object to a non-empty output', () => {
      const [x, y, heading, lost] = [1, 2, 'W', false];
      const rest = {};
      const output = [{
        x, y, heading, lost,
      }];

      const state = {
        rest,
        output,
      };
      const action = {
        type: types.ADD_OUTPUT, x, y, heading, lost,
      };
      const expectedState = {
        rest,
        output: [...output, {
          x, y, heading, lost,
        }],
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });
  });
});
