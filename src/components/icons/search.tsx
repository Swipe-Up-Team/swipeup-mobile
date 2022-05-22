import * as React from 'react'
import Svg, { SvgProps, Path, Circle } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title */

export const SearchIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Circle cx={11} cy={11} r={7} stroke={props.stroke} strokeWidth={2} />
    <Path d="m20 20-3-3" stroke={props.stroke} strokeWidth={2} strokeLinecap="round" />
  </Svg>
)
