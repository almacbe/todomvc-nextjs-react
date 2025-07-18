type Filter = 'all' | 'active' | 'completed';

export default function TodoFooter({
  filter,
  setFilter,
  activeCount,
}: {
  filter: Filter;
  setFilter: (f: Filter) => void;
  activeCount: number;
}) {
  return (
    <div className="flex items-center justify-between rounded-b border-t border-gray-200 bg-white px-8 pt-2 pb-4 font-sans text-xs text-gray-500 shadow-md">
      <span className="font-light" data-testid="active-count">
        {activeCount} item{activeCount !== 1 ? 's' : ''} left
      </span>
      <div className="flex gap-2">
        <button
          className={`rounded px-2 py-1 transition-colors hover:bg-gray-100 focus:outline-none ${filter === 'all' ? 'bg-blue-100 font-semibold text-blue-600' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`rounded px-2 py-1 transition-colors hover:bg-gray-100 focus:outline-none ${filter === 'active' ? 'bg-blue-100 font-semibold text-blue-600' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={`rounded px-2 py-1 transition-colors hover:bg-gray-100 focus:outline-none ${filter === 'completed' ? 'bg-blue-100 font-semibold text-blue-600' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      <button className="text-gray-400 transition-colors hover:text-red-500">
        Clear completed
      </button>
    </div>
  );
}
