export const chunk = (array, size) => {
  if (!array.length || size < 1) return []
  const result = []
  array.forEach((item, index) => {
    const rowSize = Math.floor(index / size)
    if (!(result[rowSize] instanceof Array)) {
      result[rowSize] = []
    }
    result[rowSize].push(item)
  })
  return result
}

