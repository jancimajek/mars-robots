import { getOrientation, getHeading } from '../orientation';

test('getOrientation', () => {
  expect(getOrientation('N')).toBe(0);
  expect(getOrientation('E')).toBe(90);
  expect(getOrientation('S')).toBe(180);
  expect(getOrientation('W')).toBe(270);
});

test('getHeading', () => {
  expect(getHeading(0)).toBe('N');
  expect(getHeading(90)).toBe('E');
  expect(getHeading(180)).toBe('S');
  expect(getHeading(270)).toBe('W');
});
