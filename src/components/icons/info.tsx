import * as React from 'react'
import Svg, { SvgProps, Circle, Path } from 'react-native-svg'

export const InfoIcon = (props: SvgProps) => (
  <Svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props} fill="none">
    <Circle cx={12} cy={12} r={9} stroke={props.stroke || '#8F9BB3'} strokeWidth={2} />
    <Path
      d="M12.5 7.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
      fill={props.fill || '#8F9BB3'}
      stroke={props.stroke || '#8F9BB3'}
    />
    <Path d="M12 17v-7" stroke={props.stroke || '#8F9BB3'} strokeWidth={2} />
  </Svg>
)
