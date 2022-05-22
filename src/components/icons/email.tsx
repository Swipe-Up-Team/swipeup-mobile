import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export function EmailIcon(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M2.5 2.5h15a.833.833 0 01.833.833v13.334a.833.833 0 01-.833.833h-15a.833.833 0 01-.833-.833V3.333A.833.833 0 012.5 2.5zm14.167 3.532l-6.607 5.916-6.727-5.935v9.82h13.334V6.032zM3.759 4.167l6.292 5.551 6.2-5.551H3.76z"
        fill="#788190"
      />
    </Svg>
  )
}
