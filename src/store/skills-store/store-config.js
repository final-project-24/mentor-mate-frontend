import { configureStore } from "@reduxjs/toolkit";
import skillCategoryReducer from "./slices/skillCategorySlice"
import skillCategoryFormReducer from "./slices/skillCategoryFormSlice"
import protoSkillReducer from "./slices/protoSkillSlice"
import userSkillsReducer from "./slices/userSkillsSlice"
import errorsReducer from "./slices/errorsSlice"
import paginationReducer from "./slices/paginationSlice"
import loadingReducer from "./slices/loadingSlice"

export const store = configureStore({
  reducer: {
    skillCategory: skillCategoryReducer,
    skillCategoryForm: skillCategoryFormReducer,
    protoSkill: protoSkillReducer,
    userSkill: userSkillsReducer, 
    error: errorsReducer, // TODO: maybe can be combined with another slice
    pagination: paginationReducer,
    loading: loadingReducer,
  }
})
