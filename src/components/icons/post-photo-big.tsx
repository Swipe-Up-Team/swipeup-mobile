import * as React from 'react'
import Svg, { SvgProps, Path, Circle } from 'react-native-svg'

export const PostPhotoBigIcon = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M3.75 12.318A2.318 2.318 0 0 1 6.068 10c.877 0 1.68-.496 2.073-1.281l1.026-2.052c.271-.543.407-.814.598-1.022a2 2 0 0 1 .916-.567C10.954 5 11.258 5 11.864 5h6.274c.606 0 .91 0 1.181.078a2 2 0 0 1 .917.567c.191.208.327.479.598 1.022l1.026 2.052A2.318 2.318 0 0 0 23.932 10a2.318 2.318 0 0 1 2.318 2.318V19c0 2.828 0 4.243-.879 5.121-.878.879-2.293.879-5.121.879H9.75c-2.828 0-4.243 0-5.121-.879-.879-.878-.879-2.293-.879-5.121v-6.682Z"
      stroke="#FFA335"
      strokeWidth={2}
    />
    <Circle cx={15} cy={16.25} r={4} stroke="#FFA335" strokeWidth={2} />
  </Svg>
)
