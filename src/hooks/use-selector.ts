import { useSelector as useReduxSelector } from 'react-redux'
import isEqual from 'react-fast-compare'
import { RootState } from '@src/store/all-reducers'

export function useSelector<T>(selector: (state: RootState) => T, equalityFn = isEqual): T {
  return useReduxSelector<RootState, T>(selector, equalityFn)
}
