import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userSkills: [],
  currentUserSkill: null
}

const userSkillSlice = createSlice({
  name: 'userSkill',
  initialState,
  reducers: {
    set_user_skills: (state, action) => {
      state.userSkills = action.payload
    },
    // set_current_user_skill: (state, action) => {
    //   state.currentUserSkill = action.payload
    // },
    add_user_skill: (state, action) => {
      state.userSkills = [action.payload, ...state.userSkills]
    },
    edit_user_skill: (state, action) => {
      const index = state.userSkills.findIndex(s => s._id === action.payload._id)

      if (index !== -1) {
        state.userSkills[index] = action.payload
      }
    },
    delete_user_skill: (state, action) => {
      state.userSkills = state.userSkills.filter(s => s._id !== action.payload)
    }
  }
})

export const {
  set_user_skills,
  // set_current_user_skill,
  add_user_skill,
  edit_user_skill,
  delete_user_skill
} = userSkillSlice.actions

export default userSkillSlice.reducer
