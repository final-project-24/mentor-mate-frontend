import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  skillCategories: [],
  currentSkillCategory: null,
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
    set_current_skill_category: (state, action) => {
      state.currentSkillCategory = action.payload
    },
    update_skill_category: (state, action) => {
      const index = state.skillCategories.findIndex(c => c._id === action.payload._id)

      if (index !== -1) {
        state.skillCategories[index] = action.payload
      }
    },
    delete_skill_category: (state, action) => {
      state.skillCategories.filter(c => c._id !== action.payload)
    },
    set_page: (state, action) => {
      state.page = action.payload
    },
    set_total_pages: (state, action) => {
      state.totalPages = action.payload
    }
  }
})

export const {
  set_skill_categories,
  set_current_skill_category,
  update_skill_category,
  set_page,
  set_total_pages,
  delete_skill_category
} = skillCategorySlice.actions

export default skillCategorySlice.reducer
