import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export const BellIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M6.448 7.97a5.586 5.586 0 0 1 11.104 0l.252 2.266.006.057a8 8 0 0 0 1.074 3.18l.03.05.577.963c.525.874.787 1.311.73 1.67a1 1 0 0 1-.345.61c-.279.234-.789.234-1.808.234H5.932c-1.02 0-1.53 0-1.808-.233a1 1 0 0 1-.346-.611c-.056-.359.206-.796.73-1.67l.579-.964.03-.05a8 8 0 0 0 1.073-3.179l.006-.057.252-2.267Z"
      stroke={props.stroke}
      strokeWidth={2}
    />
    <Path
      d="M9.102 17.665c.171.957.548 1.802 1.072 2.405.524.603 1.166.93 1.826.93.66 0 1.302-.327 1.826-.93s.9-1.448 1.072-2.405"
      stroke={props.stroke}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
)
