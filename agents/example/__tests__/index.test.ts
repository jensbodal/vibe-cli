import {run} from '../index';
import {expect, test} from 'bun:test';

test('run returns message', () => {
  expect(run()).toBe('Example agent executed');
});

