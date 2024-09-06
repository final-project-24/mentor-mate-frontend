const formatError = (error) => {
  const reducedArray = error.reduce((acc, {path, msg}) => {
    if (!acc[path]) {
      acc[path] = []
    }
  
    acc[path].push(msg)
  
    return acc
  }, {})

  const result = Object.keys(reducedArray).map(path => ({
    path: path,
    message: reducedArray[path]
  }))

  return result
}

export default formatError
