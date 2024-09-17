import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  protoSkills: []
}

const protoSkillSlice = createSlice({
  name: 'protoSkill',
  initialState,
  reducers: {
    set_proto_skills: (state, action) => {
      state.protoSkills = action.payload
    }
  }
})

export const {
  set_proto_skills
} = protoSkillSlice.actions

export default protoSkillSlice.reducer
