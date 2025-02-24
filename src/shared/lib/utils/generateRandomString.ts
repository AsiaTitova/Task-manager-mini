const CHARACTERS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export const generateRandomString = (length: number): string => {
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * CHARACTERS.length)
    result += CHARACTERS[randomIndex]
  }

  return result
}

export const generateRandomNumber = (length: number): number => {
  let result = ''

  for (let i = 0; i < length; i++) {
    const randomDigit = Math.floor(Math.random() * 10)
    result += randomDigit.toString()
  }

  return parseInt(result, 10)
}
