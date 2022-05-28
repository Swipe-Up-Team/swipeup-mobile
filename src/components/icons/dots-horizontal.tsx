import * as React from 'react'
import Svg, { SvgProps, Rect } from 'react-native-svg'

export const DotsHorizontal = (props: SvgProps) => (
  <Svg width={24} height={6} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Rect
      x={0.889}
      y={0.75}
      width={4.554}
      height={4.5}
      rx={2.25}
      stroke="#C4CAD3"
      strokeWidth={1.5}
    />
    <Rect
      x={9.737}
      y={0.75}
      width={4.554}
      height={4.5}
      rx={2.25}
      stroke="#C4CAD3"
      strokeWidth={1.5}
    />
    <Rect
      x={18.584}
      y={0.75}
      width={4.554}
      height={4.5}
      rx={2.25}
      stroke="#C4CAD3"
      strokeWidth={1.5}
    />
  </Svg>
)
