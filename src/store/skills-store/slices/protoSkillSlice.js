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
    },
    add_proto_skill: (state, action) => {
      state.protoSkills = [action.payload, ...state.protoSkills]
    },
    edit_proto_skill: (state, action) => {
      const index = state.protoSkills.findIndex(s => s._id === action.payload._id)

      if (index !== -1) {
        state.protoSkills[index] = action.payload
      }
    },
    delete_proto_skill: (state, action) => {
      state.protoSkills = state.protoSkills.filter(s => s._id !== action.payload)
    }
  }
})

export const {
  set_proto_skills,
  add_proto_skill,
  edit_proto_skill,
  delete_proto_skill
} = protoSkillSlice.actions

export default protoSkillSlice.reducer
