export function debouncedFunc(debouncedFunction, delay) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      debouncedFunction.apply(this, args)
    }, delay)
  }
}