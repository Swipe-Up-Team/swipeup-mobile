import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

function LockIcon(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Path
        d="M5 6.667v-.834a5 5 0 1110 0v.834h1.667a.833.833 0 01.833.833v10a.833.833 0 01-.833.833H3.333A.834.834 0 012.5 17.5v-10a.833.833 0 01.833-.833H5zm10.833 1.666H4.167v8.334h11.666V8.333zM9.167 13.11a1.666 1.666 0 111.666 0V15H9.167v-1.89zm-2.5-6.443h6.666v-.834a3.333 3.333 0 00-6.666 0v.834z"
        fill="#788190"
      />
    </Svg>
  )
}

export default LockIcon
