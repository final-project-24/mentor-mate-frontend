// utils
import isArray from "./isArray"

const findIdByState = (localState, contextState, field) => {
  if (localState === 'n/a' || !isArray(contextState) || typeof field !== 'string') {
    return null
  }

  const found = contextState.find(s => s[field] === localState)
  return found
    ? found._id
    : null
}

export default findIdByState
