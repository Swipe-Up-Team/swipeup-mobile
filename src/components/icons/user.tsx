import * as React from 'react'
import Svg, { SvgProps, Circle, Path } from 'react-native-svg'

export const UserIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Circle cx={12} cy={10} r={3} stroke={props.stroke} strokeWidth={2} strokeLinecap="round" />
    <Circle cx={12} cy={12} r={9} stroke={props.stroke} strokeWidth={2} />
    <Path
      d="M17.78 18.826a.286.286 0 0 0 .134-.355c-.386-.966-1.128-1.818-2.133-2.438C14.697 15.363 13.367 15 12 15s-2.697.363-3.781 1.033c-1.005.62-1.747 1.471-2.133 2.438a.286.286 0 0 0 .133.355 12.011 12.011 0 0 0 11.561 0Z"
      fill={props.stroke}
    />
  </Svg>
)
