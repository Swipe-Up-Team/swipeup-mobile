import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export const ArrowBack = (props: SvgProps) => (
  <Svg width={21} height={14} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="m2 7-.707-.707L.586 7l.707.707L2 7Zm18 1a1 1 0 1 0 0-2v2ZM7.293.293l-6 6 1.414 1.414 6-6L7.293.293Zm-6 7.414 6 6 1.414-1.414-6-6-1.414 1.414ZM2 8h18V6H2v2Z"
      fill="#253757"
    />
  </Svg>
)
