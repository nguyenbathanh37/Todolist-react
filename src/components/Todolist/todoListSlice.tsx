import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../redux/store'

// Define a type for the slice state
interface Todo {
  id: number,
  name: string,
  completed: boolean
}

interface TodoListState {
  todos: Todo[]
}

// Define the initial state using that type
const initialState: TodoListState = {
  todos: [
    {id: 0, name: 'Learn React', completed: true},
    {id: 1, name: 'Learn Typescript', completed: false},
    {id: 2, name: 'Learn Redux', completed: false},
  ]
}

export const todoListSlice = createSlice({
  name: 'todoList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload)},
  },
})

export const { addTodo } = todoListSlice.actions

export default todoListSlice.reducer