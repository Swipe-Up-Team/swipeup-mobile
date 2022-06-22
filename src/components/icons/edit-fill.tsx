import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export const EditFillIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.204 10.796 19 9c.545-.545.818-.818.964-1.112a2 2 0 0 0 0-1.776C19.818 5.818 19.545 5.545 19 5c-.545-.545-.818-.818-1.112-.964a2 2 0 0 0-1.776 0c-.294.146-.567.419-1.112.964l-1.819 1.819a10.9 10.9 0 0 0 4.023 3.977Zm-5.477-2.523-6.87 6.87c-.426.426-.638.638-.778.9-.14.26-.199.555-.316 1.145l-.616 3.077c-.066.332-.1.498-.005.593.095.095.26.061.593-.005l3.077-.616c.59-.117.885-.176 1.146-.316.26-.14.473-.352.898-.777l6.89-6.89a12.902 12.902 0 0 1-4.02-3.981Z"
      fill="#8F9BB3"
    />
  </Svg>
)