import * as React from 'react'
import Svg, { SvgProps, Rect, Path } from 'react-native-svg'

export const FullLightIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Rect x={3} y={5} width={18} height={14} rx={1.5} stroke="#fff" strokeLinecap="round" />
    <Path
      d="M6 8v-.5h-.5V8H6Zm3.646 4.354a.5.5 0 0 0 .708-.708l-.708.708ZM6.5 12V8h-1v4h1ZM6 8.5h4v-1H6v1Zm-.354-.146 4 4 .708-.708-4-4-.708.708ZM18 16v.5h.5V16H18Zm-3.646-4.354a.5.5 0 0 0-.708.708l.708-.708ZM17.5 12v4h1v-4h-1Zm.5 3.5h-4v1h4v-1Zm.354.146-4-4-.708.708 4 4 .708-.708Z"
      fill="#fff"
    />
  </Svg>
)
