import { authentication } from '@src/config/firebase-config'
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithCredential,
  getAuth,
} from 'firebase/auth'

export const firebaseService = {
  logInWithEmailAndPassword: (username: string, password: string) => {
    signInWithEmailAndPassword(authentication, username, password)
      .then(async (res) => {
        const token = await res.user.getIdToken()
        console.log(token)
        return token
      })
      .catch(error => {
        //TODO: HANDLE LOGIN FAILED HERE
        console.log(error)
      })
  },

  logInWithGoogle: async (id_token: string) => {
    const auth = getAuth()
    const credential = GoogleAuthProvider.credential(id_token)
    signInWithCredential(auth, credential)
      .then(async (res) => {
        const token = await res.user.getIdToken()
        console.log(token)
        return token
      })
      .catch(error => {
        //TODO: HANDLE SIGNUP FAILED HERE
        console.log(error)
      })
  },

  createUserWithEmailAndPassword: (username: string, password: string) => {
    createUserWithEmailAndPassword(authentication, username, password)
      .then(async (res) => {
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