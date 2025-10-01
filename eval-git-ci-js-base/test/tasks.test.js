const { getTasks, reset, addTask } = require('../lib/tasks');

beforeEach(() => {
  reset();
});

test('initial task list is empty', () => {
  expect(getTasks()).toEqual([]);
});

describe('addTask', () => {
  test('ajoute une tâche avec un nom valide', () => {
    const task = addTask('Faire les courses');
    expect(task.name).toBe('Faire les courses');
    expect(task.done).toBe(false);
    expect(task.id).toBeGreaterThan(0);
    expect(getTasks()).toHaveLength(1);
  });

  test('trim le nom de la tâche', () => {
    const task = addTask('  Nettoyer  ');
    expect(task.name).toBe('Nettoyer');
  });

  test('rejette un nom vide', () => {
    expect(() => addTask('')).toThrow();
  });

  test('rejette un nom avec uniquement des espaces', () => {
    expect(() => addTask('   ')).toThrow();
  });
});