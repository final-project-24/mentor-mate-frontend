import { configureStore } from "@reduxjs/toolkit";
import skillCategoryReducer from "./slices/skillCategorySlice"
import skillCategoryFormReducer from "./slices/forms/skillCategoryFormSlice"
import loadingReducer from "./slices/loadingSlice"

export const store = configureStore({
  reducer: {
    skillCategory: skillCategoryReducer,
    skillCategoryForm: skillCategoryFormReducer,
    loading: loadingReducer
  }
})
