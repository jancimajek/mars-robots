import { degToRad, sind, cosd } from '../math';

test('degToRad', () => {
  expect(degToRad(0)).toBe(0);
  expect(degToRad(90)).toBe(Math.PI / 2);
  expect(degToRad(180)).toBe(Math.PI);
});

test('sind', () => {
  expect(Math.round(sind(0))).toBe(0);
  expect(Math.round(sind(90))).toBe(1);
  expect(Math.round(sind(180))).toBe(0);
  expect(Math.round(sind(270))).toBe(-1);
});

test('cosd', () => {
  expect(cosd(0)).toBe(1);
  expect(Math.round(cosd(0))).toBe(1);
  expect(Math.round(cosd(90))).toBe(0);
  expect(Math.round(cosd(180))).toBe(-1);
  expect(Math.round(cosd(270))).toBe(-0);
});
