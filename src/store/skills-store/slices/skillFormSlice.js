import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSkillForm: false,
  addForm: false,
  category: '',
  skill: '',
  proficiency: '',
  notes: ''
}

const skillFormSlice = createSlice({
  name: 'skillForm',
  initialState,
  reducers: {
    set_show_skill_form: (state, action) => {
      state.showSkillForm = action.payload
    },
    set_add_form: (state, action) => {
      state.addForm = action.payload
    },
    set_category: (state, action) => {
      state.category = action.payload
    },
    set_skill: (state, action) => {
      state.skill = action.payload
    },
    set_proficiency: (state, action) => {
      state.proficiency = action.payload
    },
    set_notes: (state, action) => {
      state.notes = action.payload
    }
  }
})

export const {
  set_show_skill_form,
  set_add_form,
  set_category,
  set_skill,
  set_proficiency,
  set_notes
} = skillFormSlice.actions

export default skillFormSlice.reducer
