import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../redux/store';

interface FilterState {
  search: string
}

const initialState: FilterState = {
  search: ''
}

console.log(initialState);

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    search: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    }
  },
})

export const { search } = filterSlice.actions

export default filterSlice.reducer

export const selectSearch = (state: RootState) => state.filter.search