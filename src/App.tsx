import React, {useEffect, useState} from 'react';
import './App.css';
import {addTodo, fetchTodos} from "./store/TodoSlice";
import NewTodoForm from "./components/NewTodoForm";
import TodoList from "./components/TodoList";
import {useAppDispatch} from "./hooks/useDispatchAndSelector";

function App() {
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();

  const handleAction = () => {
    if(title.trim().length) {
      dispatch(addTodo(title));
      setTitle('');
    }
  }

    useEffect(() => {
        dispatch( fetchTodos()  )
    }, [dispatch]);



  return (
      <div className='App'>
        <NewTodoForm
            value={title}
            updateValue={setTitle}
            handleSubmit={handleAction}
        />
        <TodoList />
      </div>
  );
}
export default App;
