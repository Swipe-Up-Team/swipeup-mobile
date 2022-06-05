import * as React from 'react'
import Svg, { SvgProps, Circle, Path } from 'react-native-svg'

export const PostDeleteAssetIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Circle cx={12} cy={12} r={11} fill="#FCE0DA" stroke="#fff" strokeWidth={2} />
    <Path d="m9 9 6 6M9 15l6-6" stroke="#DF5515" strokeLinecap="round" />
  </Svg>
)
