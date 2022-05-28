import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export const PostCommentIcon = (props: SvgProps) => (
  <Svg width={14} height={12} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M12.66 6A5.333 5.333 0 0 0 7.327.667h-.565A5.898 5.898 0 0 0 .863 6.565v2.829a1.94 1.94 0 0 0 1.94 1.94h4.524A5.333 5.333 0 0 0 12.66 6Z"
      stroke="#E4532E"
      strokeWidth={1.2}
    />
  </Svg>
)
