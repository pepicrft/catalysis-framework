import {assert, expect, test} from 'vitest';
import {something as anotherThing} from '@gestaltjs/support';

// Edit an assertion and save to see HMR in action

test('Math.sqrt()', () => {
  anotherThing();
  expect(Math.sqrt(4)).toBe(2);
  expect(Math.sqrt(144)).toBe(12);
  expect(Math.sqrt(2)).toBe(Math.SQRT2);
});
