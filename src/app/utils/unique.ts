export function unique<T,>(array: T[]) {
  let result: T[] = []
  for (var i = 0; i < array?.length; i++) {
    if (result.indexOf(array[i]) === -1) {
      result.push(array[i])
    }
  }
  return result
}