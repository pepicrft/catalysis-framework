import {assert, expect, test} from 'vitest';

import {path} from "@gestaltjs/core/cli";

// Edit an assertion and save to see HMR in action

test('Math.sqrt()', () => {
  console.log(path);
  expect(Math.sqrt(4)).toBe(2);
  expect(Math.sqrt(144)).toBe(12);
  expect(Math.sqrt(2)).toBe(Math.SQRT2);
});
