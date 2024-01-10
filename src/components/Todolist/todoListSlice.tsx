import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface Todo {
  id: string,
  name: string,
  completed: boolean
}

interface TodoListState {
  todos: Todo[]
}

const initialState: TodoListState = {
  todos: []
}

console.log(initialState);

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setTodo: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload
    },
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
    checkedTodo: (state, action: PayloadAction<{id: string, completed: boolean}>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id)
      if (todo) {
        todo.completed = action.payload.completed
      }
    }
  },
})

export const { setTodo, addTodo, deleteTodo, editTodo, checkedTodo } = todoListSlice.actions

export default todoListSlice.reducer