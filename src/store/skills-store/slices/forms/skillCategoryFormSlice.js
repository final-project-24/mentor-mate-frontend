import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSkillCategoryForm: false,
  addForm: false,
  skillCategoryTitle: '',
  skillCategoryDescription: ''
}

const skillCategoryFormSlice = createSlice({
  name: 'skillCategoryForm',
  initialState,
  reducers: {
    set_show_skill_category_form: (state, action) => {
      state.showSkillCategoryForm = action.payload
    },
    set_add_form: (state, action) => {
      state.addForm = action.payload
    },
    set_skill_category_title: (state, action) => {
      state.skillCategoryTitle = action.payload
    },
    set_skill_category_description: (state, action) => {
      state.skillCategoryDescription = action.payload
    }
  }
})

export const {
  set_show_skill_category_form,
  set_add_form,
  set_skill_category_title,
  set_skill_category_description
} = skillCategoryFormSlice.actions

export default skillCategoryFormSlice.reducer
