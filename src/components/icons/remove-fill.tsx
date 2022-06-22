import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export const RemoveFillIcon = (props: SvgProps) => (
  <Svg width={24} height={24} xmlns="http://www.w3.org/2000/svg" {...props} fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-5-8h10v-2H7v2Z"
      fill={props.fill || '#fff'}
    />
  </Svg>
)
