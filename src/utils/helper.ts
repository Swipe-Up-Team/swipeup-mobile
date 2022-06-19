import { HandleErrorApi } from '@src/common/handle-error'
import { dispatch } from '@src/common/redux'
import { replaceAll } from '@src/common/string'
import {
  CODE_SUCCESS,
  CODE_TIME_OUT,
  ERROR_NETWORK_CODE,
  RESULT_CODE_PUSH_OUT,
  STATUS_TIME_OUT
} from '@src/constants'
import { ParamsNetwork, Reaction, ReactionType, ResponseBase } from '@src/models'
import { onLogout } from '@src/store/reducers/app-reducer'
import { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import * as MediaLibrary from 'expo-media-library'
import Toast from 'react-native-toast-message'

const responseDefault: ResponseBase<Record<string, unknown>> = {
  code: -500,
  status: false,
  msg: 'something has error',
  // msg: translate('error:errorData'),
  data: {}
}

export const onPushLogout = async () => {
  dispatch(onLogout())
  // TODO: remove TOKEN in storage

  // TODO:
  /**
   * do something when logout
   */
}

export const handleResponseAxios = <T>(res: AxiosResponse<T>): ResponseBase<T> => {
  if (res.data) {
    return { code: CODE_SUCCESS, status: true, data: res.data, msg: null }
  }
  return responseDefault as ResponseBase<T>
}

export const handleErrorAxios = (error: AxiosError): ResponseBase<any> => {
  if (error.code === STATUS_TIME_OUT) {
    // timeout
    return HandleErrorApi(CODE_TIME_OUT)
  }
  if (error.response) {
    if (error.response.status === RESULT_CODE_PUSH_OUT) {
      return HandleErrorApi(RESULT_CODE_PUSH_OUT)
    } else {
      return HandleErrorApi(error.response.status)
    }
  }
  return HandleErrorApi(ERROR_NETWORK_CODE)
}

export const handleQuery = (url: string, query: ParamsNetwork['query']) => {
  if (!query || Object.keys(query).length <= 0) {
    return url
  }
  let resUrl = url
  Object.keys(query).forEach(k => {
    resUrl = replaceAll(resUrl, `:${k}`, String(query[k]))
  })
  return resUrl
}

export const handlePath = (url: string, path: ParamsNetwork['path']) => {
  if (!path || Object.keys(path).length <= 0) {
    return url
  }
  let resUrl = url
  Object.keys(path).forEach(k => {
    resUrl = replaceAll(resUrl, `{${k}}`, String(path[k]))
  })
  return resUrl
}

export const handleParameter = <T extends ParamsNetwork>(
  props: T,
  method: Method
): AxiosRequestConfig => {
  const { url, body, path, params, query } = props
  const resQuery = handleQuery(url, query)

  return {
    ...props,
    method,
    url: handlePath(resQuery, path),
    data: body,
    params
  }
}

export const fetchSystemImages = async (page?: number) => {
  const getPhotos = () =>
    MediaLibrary.getAssetsAsync({
      mediaType: MediaLibrary.MediaType.photo,
      first: page ? 20 * page : 20
    })
      .then(result => {
        return result.assets
      })
      .catch(err => {
        console.log('error at helper -> fetchSystemImages', err)
      })
  return MediaLibrary.getPermissionsAsync().then(permission => {
    if (permission.granted) {
      return getPhotos()
    } else {
      MediaLibrary.requestPermissionsAsync()
        .then(_permission => {
          if (_permission.granted) {
            return getPhotos()
          } else
            Toast.show({
              type: 'error',
              text1: 'You need to grant permission to get system photos'
            })
        })
        .catch(error => {
          console.log(error)
        })
    }
  })
}

export const counterFormatter = (counter: number, digits?: number) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' }
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const item = lookup
    .slice()
    .reverse()
    .find(item => counter >= item.value)
  return item ? (counter / item.value).toFixed(digits ?? 1).replace(rx, '$1') + item.symbol : '0'
}

export const countReaction = (reactions: Reaction[], type?: ReactionType) => {
  const reactionType = type || 'like'
  let numberOfReaction = 0

  reactions.forEach(reaction => reaction.type === reactionType && numberOfReaction++)

  return numberOfReaction
}
