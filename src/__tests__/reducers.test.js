import reducer from '../reducer';
import * as types from '../actionTypes';

describe('reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      map: { x: 0, y: 0, scents: {} },
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
          x, y, orientation,
        },
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });
  });

  describe('TURN_ROBOT', () => {
    it('should turn a robot', () => {
      const [x, y, orientation] = [1, 2, 180, false];
      const rest = {};

      const state = {
        rest,
        robot: {
          x,
          y,
          orientation: 90,
        },
      };
      const action = {
        type: types.TURN_ROBOT, orientation,
      };
      const expectedState = {
        rest,
        robot: {
          x, y, orientation,
        },
      };

      expect(reducer(state, action)).toEqual(expectedState);
    });
  });

  describe('MOVE_ROBOT', () => {
    it('should move a robot', () => {
      const [x, y, orientation] = [1, 2, 180];
      const rest = {};

      const state = {
        rest,
        robot: {
          x: 0, y: 0, orientation,
        },
      };
      const action = {
        type: types.MOVE_ROBOT, x, y,
      };
      const expectedState = {
        rest,
        robot: {
          x, y, orientation,
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
});
