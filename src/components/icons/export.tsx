import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

export const ExportIcon = (props: SvgProps) => (
  <Svg width={18} height={17} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="m8.914 3.778-.402-.445.402-.364.402.364-.402.445Zm.6 6a.6.6 0 1 1-1.2 0h1.2ZM4.825 6.666l3.687-3.333.804.89L5.63 7.556l-.805-.89Zm4.491-3.333 3.687 3.333-.805.89-3.686-3.333.804-.89Zm.198.445v6h-1.2v-6h1.2Z"
      fill="#5D5FEF"
    />
    <Path
      d="M3.753 11.111v.667c0 .736.66 1.333 1.474 1.333H12.6c.815 0 1.475-.597 1.475-1.333v-.667"
      stroke="#5D5FEF"
      strokeWidth={1.2}
    />
  </Svg>
)
