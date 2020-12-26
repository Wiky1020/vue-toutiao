
export const setItem = (key, val) => {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  window.localStorage.setItem(key, val)
}

export const getItem = (key) => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}
