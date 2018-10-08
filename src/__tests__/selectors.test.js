import * as selectors from '../selectors';

test('hasScent', () => {
  expect(selectors.hasScent(1, 2)({})).toBeFalsy();
  expect(selectors.hasScent(1, 2)({
    scents: {},
  })).toBeFalsy();
  expect(selectors.hasScent(1, 2)({
    scents: { 1: {} },
  })).toBeFalsy();
  expect(selectors.hasScent(1, 2)({
    scents: { 1: { 1: true } },
  })).toBeFalsy();
  expect(selectors.hasScent(1, 2)({
    scents: { 2: { 1: true } },
  })).toBeFalsy();
  expect(selectors.hasScent(1, 2)({
    scents: { 1: { 2: true } },
  })).toBeTruthy();
});

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
