const { getTasks, reset, addTask, toggleTask } = require('../lib/tasks');

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

describe('toggleTask', () => {
  test('bascule le statut d\'une tâche de false à true', () => {
    const task = addTask('Tâche test');
    const toggled = toggleTask(task.id);
    expect(toggled.done).toBe(true);
  });

  test('bascule le statut d\'une tâche de true à false', () => {
    const task = addTask('Tâche test 2');
    toggleTask(task.id);
    const toggled = toggleTask(task.id);
    expect(toggled.done).toBe(false);
  });

  test('rejette un id inexistant', () => {
    expect(() => toggleTask(9999)).toThrow();
  });
});