import { configureStore } from "@reduxjs/toolkit";
import skillReducer from "./slices/skillSlice"
import skillCategoryReducer from "./slices/skillCategorySlice"
import protoSkillReducer from "./slices/protoSkillSlice"
import userSkillsReducer from "./slices/userSkillsSlice"
import skillFormReducer from "./slices/skillFormSlice"
import errorsReducer from "./slices/errorsSlice"
import paginationReducer from "./slices/paginationSlice"
import loadingReducer from "./slices/loadingSlice"

export const store = configureStore({
  reducer: {
    skill: skillReducer,
    skillCategory: skillCategoryReducer,
    protoSkill: protoSkillReducer,
    userSkill: userSkillsReducer, 
    skillForm: skillFormReducer,
    error: errorsReducer, // TODO: maybe can be combined with another slice
    pagination: paginationReducer,
    loading: loadingReducer,
  }
})
