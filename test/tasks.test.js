const { getTasks, reset } = require('../lib/tasks');

beforeEach(() => {
  reset();
});

test('initial task list is empty', () => {
  expect(getTasks()).toEqual([]);
});