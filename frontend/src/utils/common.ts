export const lastOfArr = <T>(arr: T[]): T | null => {
  if (!arr.length) return null
  return arr[arr.length - 1]
}
