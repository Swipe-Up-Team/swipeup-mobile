import * as React from 'react'
import Svg, { SvgProps, Ellipse, Path } from 'react-native-svg'

export const PostTagFriendIcon = (props: SvgProps) => (
  <Svg width={22} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Ellipse
      cx={9.348}
      cy={6.667}
      rx={3.364}
      ry={3.333}
      stroke="#276AD3"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="M14.222 17.04a4.998 4.998 0 0 0-1.802-2.673 5.075 5.075 0 0 0-3.072-1.034c-1.11 0-2.19.364-3.071 1.034a4.998 4.998 0 0 0-1.802 2.672M16.916 8.333v5M19.439 10.833h-5.045"
      stroke="#276AD3"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
)
