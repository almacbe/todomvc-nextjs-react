import TodosContainer from '../components/TodosContainer';

export default function Home() {
  return (
    <>
      <section className="todoapp">
        <TodosContainer />
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          Created by <a href="https://github.com/almacbe/todomvc-nextjs-react">Alfonso</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </>
  );
}
