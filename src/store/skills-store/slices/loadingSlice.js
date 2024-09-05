import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  categoriesLoading: false,
  categoriesDeleteLoading: false
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    set_categories_loading: (state, action) => {
      state.categoriesLoading = action.payload
    },
    set_category_delete_loading: (state, action) => {
      state.categoriesDeleteLoading = action.payload
    }
  }
})

export const {
  set_categories_loading,
  set_category_delete_loading
} = loadingSlice.actions

export default loadingSlice.reducer
