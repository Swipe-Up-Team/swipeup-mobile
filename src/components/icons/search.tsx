import { Icon, IconProps } from '@ui-kitten/components'
import * as React from 'react'

export const SearchIcon = (props: IconProps) => {
  const iconRef: any = React.useRef();

  React.useEffect(() => {
    iconRef.current.startAnimation();
  }, []);

  return (
    <Icon
      {...props}
      ref={iconRef}
      animationConfig={{ cycles: Infinity }}
      animation='pulse'
      name='search-outline' />
  )
}
