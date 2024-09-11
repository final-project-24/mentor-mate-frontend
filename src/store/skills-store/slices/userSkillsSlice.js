import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  userSkills: []
}

const userSkillSlice = createSlice({
  name: 'userSkill',
  initialState,
  reducers: {
    set_user_skills: (state, action) => {
      state.userSkills = action.payload
    }
  }
})

export const {
  set_user_skills
} = userSkillSlice.actions

export default userSkillSlice.reducer
