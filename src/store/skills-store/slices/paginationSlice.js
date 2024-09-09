import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  page: 1,
  totalPages: 1
}

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    set_page: (state, action) => {
      state.page = action.payload
    },
    set_total_pages: (state, action) => {
      state.totalPages = action.payload
    }
  }
})

export const {
  set_page,
  set_total_pages
} = paginationSlice.actions

export default paginationSlice.reducer
