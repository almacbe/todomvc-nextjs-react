import TodosContainer from '../components/TodosContainer';

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-start bg-[#f5f5f5] font-sans sm:justify-center">
      <h1
        className="mb-8 text-center font-sans text-[100px] font-light tracking-tight text-gray-200 drop-shadow-md select-none"
        style={{ fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
      >
        todos
      </h1>
      <TodosContainer />
      <footer className="mt-8 text-center text-xs text-gray-400 select-none">
        <p>Double-click to edit a todo</p>
        <p>
          Created by{' '}
          <a href="https://github.com/alfonso" className="underline hover:text-blue-500">
            alfonso
          </a>
        </p>
        <p>
          Part of{' '}
          <a href="http://todomvc.com" className="underline hover:text-blue-500">
            TodoMVC
          </a>
        </p>
      </footer>
    </section>
  );
}
