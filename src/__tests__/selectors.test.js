import * as selectors from '../selectors';

test('isOffMap', () => {
  expect(selectors.isOffMap(1, 2)({
    map: { x: 1, y: 2 },
  })).toBeFalsy();
  expect(selectors.isOffMap(0, 0)({
    map: { x: 1, y: 2 },
  })).toBeFalsy();
  expect(selectors.isOffMap(-1, 0)({
    map: { x: 1, y: 2 },
  })).toBeTruthy();
  expect(selectors.isOffMap(0, -1)({
    map: { x: 1, y: 2 },
  })).toBeTruthy();
  expect(selectors.isOffMap(2, 0)({
    map: { x: 1, y: 2 },
  })).toBeTruthy();
  expect(selectors.isOffMap(0, 3)({
    map: { x: 1, y: 2 },
  })).toBeTruthy();
});
