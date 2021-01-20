export function wait (timeMs) {
  return new Promise(resolve => {
    setTimeout(resolve, timeMs)
  })
}
