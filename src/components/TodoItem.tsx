import {toggleComplete, removeTodo} from '../store/TodoSlice';
import {useAppDispatch} from "../hooks/useDispatchAndSelector";


interface ITodoItemProps{
    id:string,
    title:string,
    completed:boolean,
}


const TodoItem:React.FC<ITodoItemProps> = ({ id, title, completed } ) => {
    const dispatch = useAppDispatch();

    return (
        <li>
            <input
                type='checkbox'
                checked={completed}
                onChange={() => dispatch(toggleComplete( id ))}
            />
            <span>{title}</span>
            <span onClick={() => dispatch(removeTodo( id ))}>&times;</span>
        </li>
    );
};

export default TodoItem;