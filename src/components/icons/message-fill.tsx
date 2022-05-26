import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export const MessageFillIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 3a9 9 0 1 1 0 18H7.5c-1.398 0-2.097 0-2.648-.228a3 3 0 0 1-1.624-1.624C3 18.597 3 17.898 3 16.5V12a9 9 0 0 1 9-9Zm4 8a1 1 0 0 0-1-1H9a1 1 0 1 0 0 2h6a1 1 0 0 0 1-1Zm-3 4a1 1 0 0 0-1-1H9a1 1 0 1 0 0 2h3a1 1 0 0 0 1-1Z"
      fill={props.fill}
    />
  </Svg>
)
