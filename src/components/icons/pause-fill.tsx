import * as React from 'react'
import Svg, { SvgProps, Rect, Circle } from 'react-native-svg'

export const PauseFillIcon = (props: SvgProps) => (
  <Svg width={48} height={48} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Circle cx={24} cy={24} r={22.5} stroke="#fff" strokeWidth={2} />
    <Rect x={16} y={14.667} width={5.333} height={18.667} rx={1} fill="#fff" />
    <Rect x={26.667} y={14.667} width={5.333} height={18.667} rx={1} fill="#fff" />
  </Svg>
)
