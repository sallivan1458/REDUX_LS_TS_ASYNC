import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from "@reduxjs/toolkit";
import {defaultArray} from "../data/defaultArray";
import {AppDispatch} from "./index";
import {useLocalStorage} from "../hooks/useLocalStorage";


export interface ITodo {
    id: string,
    title: string,
    completed: boolean,
}


export const fetchTodos = () => {
    return async (dispatch:AppDispatch) => {

        const { checkPersistRoot_Todos } = useLocalStorage('persist:root')
        if ( !checkPersistRoot_Todos() ) {
            try {
                dispatch(fetchTodosRequest())
                setTimeout(() => {
                    dispatch(fetchTodosSuccess(defaultArray))
                    console.log('fetching todos...')
                    // throw new Error('test error')
                }, 900)
            } catch (e) {
                dispatch(fetchTodosError('error'))
            }
        }
    }
};





interface ITodoState  {
    list: ITodo[],
    loading: boolean,
    error: string | null,
}

const initialState: ITodoState = {
    list: [],
    loading: false,
    error: null,
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        fetchTodosRequest(state){
          state.loading = true;
          state.error = null;
        },
        fetchTodosSuccess(state, action: PayloadAction<ITodo[]>) {
          state.loading = false;
          state.error = null;
          state.list = action.payload;
        },
        fetchTodosError(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        addTodo(state, action: PayloadAction<string>) {
            state.list.push({
                id: new Date().toISOString(),
                title: action.payload,
                completed: false,
            });
        },
        toggleComplete(state, action: PayloadAction<string>) {
            const toggledTodo = state.list.find(todo => todo.id === action.payload);
            if (toggledTodo) {
                toggledTodo.completed = !toggledTodo.completed;
            }
        },
        removeTodo(state, action: PayloadAction<string>) {
            state.list = state.list.filter(todo => todo.id !== action.payload);
        }
    },


});

export const {
    addTodo,
    toggleComplete,
    removeTodo,
    fetchTodosRequest,
    fetchTodosSuccess,
    fetchTodosError,
} = todoSlice.actions;

export default todoSlice.reducer;