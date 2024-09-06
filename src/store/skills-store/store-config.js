import { configureStore } from "@reduxjs/toolkit";
import skillCategoryReducer from "./slices/skillCategorySlice"
import skillCategoryFormReducer from "./slices/skillCategoryFormSlice"
import errorsReducer from "./slices/errorsSlice"
import paginationReducer from "./slices/paginationSlice"
import loadingReducer from "./slices/loadingSlice"

export const store = configureStore({
  reducer: {
    skillCategory: skillCategoryReducer,
    skillCategoryForm: skillCategoryFormReducer,
    errors: errorsReducer,
    pagination: paginationReducer,
    loading: loadingReducer,
  }
})
