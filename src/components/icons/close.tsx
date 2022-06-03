import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export const CloseIcon = (props: SvgProps) => (
  <Svg width={34} height={34} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="m12.728 12.728 8.485 8.485M21.213 12.728l-8.485 8.485"
      stroke={props.stroke || '#CCD2E3'}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
)
