import * as React from 'react'
import Svg, { SvgProps, Circle, Path } from 'react-native-svg'

export const PostTagFriendBigIcon = (props: SvgProps) => (
  <Svg width={26} height={26} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Circle
      cx={10.833}
      cy={8.667}
      r={4.333}
      stroke="#276AD3"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="M17.112 22.151a6.5 6.5 0 0 0-12.557 0M20.583 10.833v6.5M23.833 14.083h-6.5"
      stroke="#276AD3"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
)
