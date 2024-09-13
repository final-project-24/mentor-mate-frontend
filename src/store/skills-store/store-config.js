import { configureStore } from "@reduxjs/toolkit";
import skillCategoryReducer from "./slices/skillCategorySlice"
import skillFormReducer from "./slices/skillFormSlice"
import protoSkillReducer from "./slices/protoSkillSlice"
import userSkillsReducer from "./slices/userSkillsSlice"
import errorsReducer from "./slices/errorsSlice"
import paginationReducer from "./slices/paginationSlice"
import loadingReducer from "./slices/loadingSlice"

export const store = configureStore({
  reducer: {
    skillCategory: skillCategoryReducer,
    skillForm: skillFormReducer,
    protoSkill: protoSkillReducer,
    userSkill: userSkillsReducer, 
    error: errorsReducer, // TODO: maybe can be combined with another slice
    pagination: paginationReducer,
    loading: loadingReducer,
  }
})
