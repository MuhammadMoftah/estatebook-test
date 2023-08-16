export * from './debounce'

export const getDevice = (userAgent: string): string => {
  const device = userAgent.match(/Android|iPhone|iPod|iPad/)

  return device?.length ? device[0] : ''
}
