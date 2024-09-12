import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  skillsLoading: false,
  skillDeleteLoading: false,
  categoriesDeleteLoading: false
}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    set_skills_loading: (state, action) => {
      state.skillsLoading = action.payload
    },
    set_skill_delete_loading: (state, action) => {
      state.skillDeleteLoading = action.payload
    },
    set_category_delete_loading: (state, action) => {
      state.categoriesDeleteLoading = action.payload
    }
  }
})

export const {
  set_skills_loading,
  set_skill_delete_loading,
  set_category_delete_loading,
} = loadingSlice.actions

export default loadingSlice.reducer
