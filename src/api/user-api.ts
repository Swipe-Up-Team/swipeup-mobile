// import { API_ENDPOINT } from '@src/constants'
// import { ParamsNetwork, ResponseBase } from '@src/models'
// import { LoginResponseData } from '@src/screens/login/models'
// import { NetworkService } from '../services/network-service'

// export const userApi = {
//   logInToDatabase: async (): Promise<ResponseBase<LoginResponseData> | null> => {
//     const paramsNetwork: ParamsNetwork = {
//       url: API_ENDPOINT.LOGIN
//     }

//     return NetworkService.Get<LoginResponseData>(paramsNetwork)
//       .then(res => {
//         return res
//       })
//       .catch((err: any) => {
//         //TODO: HANDLE LOGIN TO DATABASE FAILED HERE
//         console.log('err at user-api')
//         console.log(err)
//         return null
//       })
//   }
// }
