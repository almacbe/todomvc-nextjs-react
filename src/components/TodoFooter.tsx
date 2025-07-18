type Filter = 'all' | 'active' | 'completed';

export default function TodoFooter({ filter, setFilter, activeCount }: { filter: Filter; setFilter: (f: Filter) => void; activeCount: number }) {
  return (
    <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-200 bg-white shadow-md px-8 pb-4 rounded-b font-sans">
      <span className="font-light" data-testid="active-count">
        {activeCount} item{activeCount !== 1 ? 's' : ''} left
      </span>
      <div className="flex gap-2">
        <button
          className={`px-2 py-1 rounded hover:bg-gray-100 focus:outline-none transition-colors ${filter === 'all' ? 'bg-blue-100 text-blue-600 font-semibold' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`px-2 py-1 rounded hover:bg-gray-100 focus:outline-none transition-colors ${filter === 'active' ? 'bg-blue-100 text-blue-600 font-semibold' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={`px-2 py-1 rounded hover:bg-gray-100 focus:outline-none transition-colors ${filter === 'completed' ? 'bg-blue-100 text-blue-600 font-semibold' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      <button className="text-gray-400 hover:text-red-500 transition-colors">Clear completed</button>
    </div>
  );
} 