import TodoItem from './TodoItem';
import {useAppSelector} from "../hooks/useDispatchAndSelector";
import {ITodo} from "../store/TodoSlice";

const TodoList:React.FC = () => {
    const todos:ITodo[] = useAppSelector(state => state.todos.list);

    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    {...todo}
                />
            ))}
        </ul>
    );
};

export default TodoList;