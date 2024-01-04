import { createSlice, PayloadAction } from '@reduxjs/toolkit'


// Define a type for the slice state
interface Todo {
  id: string,
  name: string,
  completed: boolean
}

interface TodoListState {
  todos: Todo[]
}

// Define the initial state using that type
const initialState: TodoListState = {
  todos: [
    {id: '0', name: 'Learn React', completed: true},
    {id: '1', name: 'Learn Typescript', completed: false},
    {id: '2', name: 'Learn Redux', completed: false},
  ]
}

export const todoListSlice = createSlice({
  name: 'todoList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload)
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload)
    },
    editTodo: (state, action: PayloadAction<{id: string, name: string}>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id)
      if (todo) {
        todo.name = action.payload.name
      }
    },
    checkedTodo: (state, action: PayloadAction<string>) => {
      
    }
  },
})

export const { addTodo, deleteTodo, editTodo, checkedTodo } = todoListSlice.actions

export default todoListSlice.reducer