import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export const CommentReplyIcon = (props: SvgProps) => (
  <Svg width={19} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="m3.594 6.667-.667.745-.832-.745.832-.745.667.745ZM16.506 12a1 1 0 1 1-2 0h2ZM6.65 10.745 2.927 7.412l1.335-1.49 3.722 3.333-1.334 1.49ZM2.927 5.922 6.65 2.588l1.334 1.49-3.722 3.334-1.335-1.49Zm.667-.255h6.578v2H3.594v-2Zm6.578 0A6.333 6.333 0 0 1 16.506 12h-2a4.333 4.333 0 0 0-4.334-4.333v-2Z"
      fill="#3CAA33"
    />
  </Svg>
)
