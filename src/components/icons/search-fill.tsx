import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export const SearchFillIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path d="M18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" fill={props.fill} />
    <Path d="m20 20-2-2" stroke={props.fill} strokeWidth={2} strokeLinecap="round" />
  </Svg>
)
