import * as React from 'react'
import Svg, { SvgProps, Path, Rect } from 'react-native-svg'

export const UserFillIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10a9.977 9.977 0 0 1-3.443 7.55 7 7 0 0 0-13.114 0A9.977 9.977 0 0 1 2 12Zm14.83 8.706.013.045A9.955 9.955 0 0 1 12 22a9.955 9.955 0 0 1-4.843-1.249 5 5 0 0 1 9.672-.045ZM10 9a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
      fill="#fff"
    />
    <Rect x={2.5} y={2.5} width={19} height={19} rx={9.5} stroke={props.stroke} />
  </Svg>
)
