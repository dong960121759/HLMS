export const fromEntries = arr => {
  if (Object.prototype.toString.call(arr) === '[object Map]') {
    const result = {}
    for (const key of arr.keys()) {
      result[key] = arr.get(key)
    }

    return result
  }

  if (Array.isArray(arr)) {
    const result = {}
    arr.map(([key, value]) => {
      result[key] = value
    })

    return result
  }
}

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

