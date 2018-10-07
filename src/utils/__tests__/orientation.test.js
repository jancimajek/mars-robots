import { getOrientation } from '../orientation';

test('getOrientation', () => {
  expect(getOrientation('N')).toBe(0);
  expect(getOrientation('E')).toBe(90);
  expect(getOrientation('S')).toBe(180);
  expect(getOrientation('W')).toBe(270);
});
