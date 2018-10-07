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
});
