import { API_ENDPOINT } from '@src/constants'
import { ParamsNetwork } from '@src/models'
import { NetworkService } from '../services/network-service'

export const userApi = {
  logInToDatabase: () => {
    const paramsNetwork: ParamsNetwork = {
      url: API_ENDPOINT.LOGIN
    }

    NetworkService.Get(paramsNetwork)
      .then((res: any) => {
        console.log(res)
      })
      .catch((err: any) => {
        //TODO: HANDLE LOGIN TO DATABASE FAILED HERE
        console.log('err at user-api')
        console.log(err)
      })
  }
}
