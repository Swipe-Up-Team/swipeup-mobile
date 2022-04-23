import { API_ENDPOINT } from '@src/constants';
import { ParamsNetwork } from '@src/models';
import { NetworkService } from '../services/network-service';

interface ParamsNetworkWithFirebase extends ParamsNetwork {
  token: string;
}

export const userApi = {
  logInToDatabase: (accessToken: string) => {
    const paramsNetwork: ParamsNetworkWithFirebase = {
      url: API_ENDPOINT.LOGIN,
      token: accessToken
    }

    NetworkService.Get(paramsNetwork, accessToken)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        //TODO: HANDLE LOGIN TO DATABASE FAILED HERE
        console.log('err at user-api')
        console.log(err);
      });
  }
}