import { NODE_ENV } from "./config"

const logIfNodeDev = (message, variable, isError = false) => {
  if (NODE_ENV === 'dev') {
    return isError
      ? console.error(message, variable)
      : console.log(message, variable)
  }
}

export default logIfNodeDev
