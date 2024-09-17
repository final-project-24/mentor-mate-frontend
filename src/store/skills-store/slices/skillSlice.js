import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentSkillItem: null,
  currentCategory: null
}

const skillSlice = createSlice({
  name: 'skill',
  initialState,
  reducers: {
    set_current_skill_item: (state, action) => {
      state.currentSkillItem = action.payload
    },
    set_current_category: (state, action) => {
      state.currentCategory = action.payload
    }
  }
})

export const {
  set_current_skill_item,
  set_current_category
} = skillSlice.actions

export default skillSlice.reducer
