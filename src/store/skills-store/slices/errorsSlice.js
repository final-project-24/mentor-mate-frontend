import { createSlice } from "@reduxjs/toolkit"

// utils
import formatError from "../../../utils/formatError"

const initialState = {
  errorsArray: []
}

export const errorsSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    set_errors_array: (state, action) => {
      state.errorsArray = formatError(action.payload)
    }
  }
})

export const {
  set_errors_array
} = errorsSlice.actions

export default errorsSlice.reducer
