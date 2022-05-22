import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export const MessageIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M20 12a8 8 0 1 0-16 0v5.09c0 .848 0 1.27.126 1.609a2 2 0 0 0 1.175 1.175C5.64 20 6.062 20 6.91 20H12a8 8 0 0 0 8-8Z"
      stroke={props.stroke}
      strokeWidth={2}
    />
  </Svg>
)
