import TodosContainer from '../components/TodosContainer';

export default function Home() {
  return (
    <div>
      <TodosContainer />
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          Created by{' '}
          <a href="https://github.com/tastejs/todomvc">the TodoMVC Team</a>
        </p>
        <p>
          Part of{' '}
          <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
}
