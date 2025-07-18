import TodosContainer from "../components/TodosContainer";

export default function Home() {
  return (
    <section className="bg-[#f5f5f5] min-h-screen flex flex-col items-center justify-start sm:justify-center font-sans">
      <h1 className="text-[100px] font-light text-center text-gray-200 tracking-tight drop-shadow-md select-none mb-8 font-sans" style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>todos</h1>
      <TodosContainer />
      <footer className="mt-8 text-gray-400 text-xs text-center select-none">
        <p>Double-click to edit a todo</p>
        <p>Created by <a href="https://github.com/alfonso" className="underline hover:text-blue-500">alfonso</a></p>
        <p>Part of <a href="http://todomvc.com" className="underline hover:text-blue-500">TodoMVC</a></p>
      </footer>
    </section>
  );
}
