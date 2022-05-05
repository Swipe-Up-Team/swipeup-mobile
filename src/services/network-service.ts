import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import queryString from 'query-string'
import { ParamsNetwork, ResponseBase } from '@src/models'
import { AppState, onSetToken } from '@src/store/app-reducer'
import { dispatch, getState } from '@src/common/redux'
import { handleErrorAxios, handleParameter, handleResponseAxios, onPushLogout } from '@utils/helper'
import { API_ENDPOINT, RESULT_CODE_PUSH_OUT, TIME_OUT } from '@src/constants'
import { StyleSheet } from 'react-native'

const tokenKeyHeader = 'authorization'
let refreshTokenRequest: Promise<string | null> | null = null

const AxiosInstance = axios.create({
  baseURL: 'http://34.142.206.170:3040/',
  timeout: TIME_OUT,
  headers: {
    'Content-Type': 'application/json'
  },
  paramsSerializer: params => queryString.stringify(params)
})

AxiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    if (
      error &&
      error.response &&
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      refreshTokenRequest = refreshTokenRequest
        ? refreshTokenRequest
        : refreshToken(originalRequest)
      const newToken = await refreshTokenRequest
      refreshTokenRequest = null
      if (newToken === null) {
        return Promise.reject(error)
      }
      dispatch(onSetToken(newToken))
      originalRequest.headers[tokenKeyHeader] = `Bearer ${newToken}`
      return AxiosInstance(originalRequest)
    }
    return Promise.reject(error)
  }
)

// refresh token
async function refreshToken(originalRequest: any) {
  return AxiosInstance.get(API_ENDPOINT.REFRESH_TOKEN, originalRequest)
    .then((res: AxiosResponse) => res.data)
    .catch(() => null)
}

// base
function Request<T = unknown>(config: AxiosRequestConfig, isCheckOut = true) {
  return new Promise<ResponseBase<T> | null>(resp => {
    const { token }: AppState = getState('app')
    const defaultConfig: AxiosRequestConfig = {
      //TODO: fix this
      baseURL: 'http://34.142.206.170:3040/',
      timeout: TIME_OUT,
      headers: {
        'Content-Type': 'application/json',
        [tokenKeyHeader]: token ? `Bearer ${token}` : ''
      }
    }
    AxiosInstance.request(StyleSheet.flatten([defaultConfig, config]))
      .then((res: AxiosResponse<T>) => {
        const result = handleResponseAxios(res)
        resp(result)
      })
      .catch((error: AxiosError) => {
        const result = handleErrorAxios(error)
        if (!isCheckOut) {
          resp(result)
        }
        if (result.code === RESULT_CODE_PUSH_OUT && isCheckOut) {
          onPushLogout()
          resp(null)
        } else {
          resp(result)
        }
      })
  })
}

//TODO: fix this
// get
async function Get<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'GET'))
}

// post
async function Post<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'POST'))
}

type ParameterPostFormData = AxiosRequestConfig & ParamsNetwork
// post FormData
async function PostFormData<T>(params: ParamsNetwork) {
  const { token }: AppState = getState('app')
  const headers: AxiosRequestConfig['headers'] = {
    [tokenKeyHeader]: token ? `Bearer ${token}` : '',
    'Content-Type': 'multipart/form-data'
  }
  return Request<T>(handleParameter<ParameterPostFormData>({ ...params, headers }, 'POST'))
}

// put
async function Put<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'PUT'))
}

// delete
async function Delete<T>(params: ParamsNetwork) {
  return Request<T>(handleParameter(params, 'DELETE'))
}
export type NetWorkResponseType<T> = (params: ParamsNetwork) => Promise<ResponseBase<T> | null>

export const NetworkService = {
  Get,
  Post,
  Put,
  Delete,
  PostFormData,
  Request
}
