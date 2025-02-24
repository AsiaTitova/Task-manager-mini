const hundredDivider = 100
const decimalDivider = 10
const minRange = 4
const maxRange = 20
const usualIndex = 2
const lastIndex = 5
const subRange = 5
const indexArr = [usualIndex, 0, 1, 1, 1, usualIndex]

export const getInclinedWord = (number: number, words: string[]): string => {
  return words[
    number % hundredDivider > minRange && number % hundredDivider < maxRange
      ? usualIndex
      : indexArr[
          number % decimalDivider < subRange
            ? Math.abs(number) % decimalDivider
            : lastIndex
        ]
  ]
}
