import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store';
import { createSelector } from '@reduxjs/toolkit';
import { selectSearch } from '../Filter/filterSlice';

interface Todo {
  id: string,
  name: string,
  completed: boolean
}

interface TodoListState {
  todos: Todo[],
  currentPage: number,
  todosPerPage: number
}

const initialState: TodoListState = {
  todos: [],
  currentPage: 1,
  todosPerPage: 10
}

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    setTodo: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.unshift(action.payload)
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
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    }
  },
})

export const { setTodo, addTodo, deleteTodo, editTodo, checkedTodo, setCurrentPage } = todoListSlice.actions
export default todoListSlice.reducer

export const selectTodos = (state: RootState) => state.todoList.todos
export const selectFilterTodos = createSelector(
  selectSearch,
  selectTodos,
  (search, todos) => {
    const todosRemaining = todos.filter((todo) => {
      return todo.name.includes(search)
    })

    return todosRemaining
  }
)

export const selectCurrentPage = (state: RootState) => state.todoList.currentPage
export const selectNumberOfTodosPerPage = (state: RootState) => state.todoList.todosPerPage

export const selectTodosPerPage = createSelector(
  selectCurrentPage,
  selectNumberOfTodosPerPage,
  selectFilterTodos,
  (currentPage, numberOfTodosPerPage, todos) => {
    const start = (currentPage - 1) * numberOfTodosPerPage
    const end = start + numberOfTodosPerPage
    return todos.slice(start, end)
  }
)