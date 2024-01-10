import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
  filter: string
}

const initialState: FilterState = {
  filter: ''
}

console.log(initialState);

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    search: (state, action: PayloadAction<string>) => {
      state.filter = action.payload
    }
  },
})

export const { search } = filterSlice.actions

export default filterSlice.reducer