import { userApi } from '@src/api/user-api'
import { dispatch } from '@src/common/redux'
import { authentication } from '@src/config/firebase-config'
import { onSetToken } from '@src/store/reducers/app-reducer'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  getAuth
} from 'firebase/auth'

export const firebaseService = {
  logInWithEmailAndPassword: async (email: string, password: string) =>
    signInWithEmailAndPassword(authentication, email, password)
      .then(async res => {
        const token = await res.user.getIdToken()
        console.log('🚀 ~ file: firebase-services.ts ~ line 18 ~ token', token)

        // TODO: split code if du quan
        dispatch(onSetToken(token))
        userApi.logInToDatabase()
        return token
      })
      .catch(error => {
        //TODO: HANDLE LOGIN FAILED HERE
        console.log(error)
      }),

  logInWithGoogle: async (id_token: string) => {
    const auth = getAuth()
    const credential = GoogleAuthProvider.credential(id_token)
    signInWithCredential(auth, credential)
      .then(async res => {
        const token = await res.user.getIdToken()
        userApi.logInToDatabase()
        return token
      })
      .catch(error => {
        //TODO: HANDLE SIGNUP FAILED HERE
        console.log(error)
      })
  },

  createUserWithEmailAndPassword: (username: string, password: string) => {
    createUserWithEmailAndPassword(authentication, username, password)
      .then(async res => {
        //TODO: IMPLEMENT
        // const token = await res.user.getIdToken()
        // console.log(token)
        // return token
      })
      .catch(error => {
        //TODO: HANDLE SIGNUP FAILED HERE
        console.log(error)
      })
  }
}
