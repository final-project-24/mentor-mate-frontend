import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  skillCategories: [],
  page: 1,
  totalPages: 1
}

export const skillCategorySlice = createSlice({
  name: 'skillCategory',
  initialState,
  reducers: {
    set_skill_categories: (state, action) => {
      state.skillCategories = action.payload
    },
    add_skill_category: (state, action) => {
      state.skillCategories = [action.payload, ...state.skillCategories]
    },
    update_skill_category: (state, action) => {
      const index = state.skillCategories.findIndex(c => c._id === action.payload._id)

      if (index !== -1) {
        state.skillCategories[index] = action.payload
      }
    },
    delete_skill_category: (state, action) => {
      state.skillCategories = state.skillCategories.filter(c => c._id !== action.payload)
    }
  }
})

export const {
  set_skill_categories,
  add_skill_category,
  update_skill_category,
  delete_skill_category
} = skillCategorySlice.actions

export default skillCategorySlice.reducer
