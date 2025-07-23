import { Filter } from '../types/Todo';

export default function TodoFooter({
  filter,
  setFilter,
  activeCount,
  completedCount,
  onClearCompleted,
}: {
  filter: Filter;
  setFilter: (f: Filter) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}) {
  return (
    <footer className="footer">
      <span className="todo-count" data-testid="active-count">
        <strong>{activeCount}</strong> item{activeCount !== 1 ? 's' : ''} left
      </span>
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={filter === 'all' ? 'selected' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/active"
            className={filter === 'active' ? 'selected' : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/completed"
            className={filter === 'completed' ? 'selected' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </a>
        </li>
      </ul>
      {completedCount > 0 && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
}
