import { processColor } from 'react-native'

export const replaceAll = (source = '', textReplace = '', textInstead = '') => {
  return source.split(textReplace).join(textInstead)
}
export const hexStringFromCSSColor = (color: string) => {
  const processedColor = processColor(color)
  const colorStr = `${(processedColor ?? '').toString(16)}`
  const withoutAlpha = colorStr.substring(2, colorStr.length)
  const alpha = colorStr.substring(0, 2)
  return `#${withoutAlpha}${alpha}`
}
