export function debounce(this: any, func: () => void, delay: number) {
  let timeId: NodeJS.Timeout
  return (...args: any) => {
    clearTimeout(timeId)
    timeId = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
