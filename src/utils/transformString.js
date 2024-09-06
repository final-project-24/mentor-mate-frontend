const transformString = (string) => {
  const transformed = string.replaceAll(/([a-z])([A-Z])/g, '$1 $2')
  
  return transformed.charAt(0).toUpperCase() + transformed.substring(1)
}

export default transformString
