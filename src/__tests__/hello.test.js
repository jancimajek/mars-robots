import { hello } from '../hello';

test('hello', () => {
  expect(hello('world')).toBe('Hello world');
});
