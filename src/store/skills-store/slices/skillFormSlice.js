import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSkillForm: false,
  addForm: false,
  editForm: false
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
    set_edit_form: (state, action) => {
      state.editForm = action.payload
    }
  }
})

export const {
  set_show_skill_form,
  set_add_form,
  set_edit_form
} = skillFormSlice.actions

export default skillFormSlice.reducer
