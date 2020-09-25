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

