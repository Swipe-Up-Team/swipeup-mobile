import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export const SendFillIcon = (props: SvgProps) => (
  <Svg fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m15.44 19.146-6.748-2.249c-2.353-.784-3.53-1.176-3.53-1.897 0-.72 1.177-1.113 3.53-1.897l17.513-5.838c1.656-.552 2.484-.828 2.921-.391.437.437.161 1.265-.39 2.92l-5.839 17.514c-.784 2.353-1.176 3.53-1.897 3.53-.72 0-1.113-1.177-1.897-3.53l-2.25-6.747 6.354-6.354a1 1 0 0 0-1.414-1.414l-6.354 6.354Z"
      fill={props.fill || '#fff'}
    />
  </Svg>
)
