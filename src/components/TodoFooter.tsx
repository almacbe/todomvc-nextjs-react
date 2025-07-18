export default function TodoFooter() {
  return (
    <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-200 bg-white shadow-md px-8 pb-4 rounded-b font-sans">
      <span className="font-light">0 items left</span>
      <div className="flex gap-2">
        <button className="px-2 py-1 rounded hover:bg-gray-100 focus:outline-none bg-blue-100 text-blue-600 font-semibold transition-colors">All</button>
        <button className="px-2 py-1 rounded hover:bg-gray-100 focus:outline-none transition-colors">Active</button>
        <button className="px-2 py-1 rounded hover:bg-gray-100 focus:outline-none transition-colors">Completed</button>
      </div>
      <button className="text-gray-400 hover:text-red-500 transition-colors">Clear completed</button>
    </div>
  );
} 