import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export const HeartIcon = (props: SvgProps) => (
  <Svg width={19} height={16} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="m4.081 9.501 4.933 4.19c.038.032.056.048.074.06a.5.5 0 0 0 .579 0c.018-.012.036-.028.074-.06l4.933-4.19c1.552-1.318 1.724-3.66.399-5.205-1.489-1.734-4.27-1.44-5.337.581a.405.405 0 0 1-.717 0c-1.066-2.02-3.848-2.315-5.337-.58-1.326 1.545-1.153 3.886.4 5.204Z"
      stroke="#5243AA"
      strokeWidth={1.2}
    />
  </Svg>
)
