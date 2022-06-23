import * as React from 'react'
import Svg, { SvgProps, Path, Circle } from 'react-native-svg'

export const PlayFillIcon = (props: SvgProps) => (
  <Svg width={48} height={48} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Circle cx={24} cy={24} r={22.5} stroke="#fff" strokeWidth={2} />
    <Path
      d="M32.603 21.138 19.81 14.605c-2.344-1.197-5.102.544-5.102 3.22v12.35c0 2.676 2.758 4.417 5.102 3.22l12.793-6.533c2.31-1.18 2.31-4.545 0-5.724Z"
      fill="#fff"
    />
  </Svg>
)
