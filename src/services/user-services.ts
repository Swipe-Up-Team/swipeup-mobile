// import { ResponseBase } from '@src/models'
// import { NetWorkResponseType } from './network-service'
// import { userApi } from '@src/api/user-api'
import { dispatch, getState } from '@src/common'
import { firestore } from '@src/config'
import { authentication } from '@src/config/firebase-config'
import { FIREBASE_ERROR_CODE, FIRESTORE_ENDPOINT } from '@src/constants'
import { User, UserGender, UserStatus } from '@src/models'
import { onSetToken } from '@src/store/reducers/app-reducer'
import { onSetUser } from '@src/store/reducers/user-reducer'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword
} from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'
import Toast from 'react-native-toast-message'

const createNewUser = (uid: string, username: string) => {
  const newUser: User = {
    id: uid,
    email: username,
    name: username,
    status: UserStatus.PUBLIC,
    avatar: '',
    bio: '',
    birthDay: {
      date: 0,
      month: 0,
      year: 0
    },
    gender: UserGender.MALE,
    phone: '',
    followingIDs: [],
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime()
  }
  return newUser
}

export const userService = {
  logInWithEmailAndPassword: async (email: string, password: string) =>
    signInWithEmailAndPassword(authentication, email, password)
      .then(async res => {
        // console.log('🚀 ~ file: user-services.ts ~ line 49 ~ ̥', res)
        const token = await res.user.getIdToken()
        const user = await userService.getUser(res.user.uid)
        // console.log('🚀 ~ file: user-services.ts ~ line 49 ~ ̥', user)

        dispatch(onSetUser(user!))
        dispatch(onSetToken(token))
      })
      .catch(error => {
        switch (error.code) {
          case FIREBASE_ERROR_CODE.USER_NOT_FOUND:
            Toast.show({ type: 'error', text1: 'User not found' })
            break
          case FIREBASE_ERROR_CODE.WRONG_PASSWORD:
            Toast.show({ type: 'error', text1: 'Wrong password' })
            break
          case FIREBASE_ERROR_CODE.TOO_MANY_REQUESTS:
            Toast.show({
              type: 'error',
              text1: 'Too many request',
              text2: 'You tried several times, please try again later'
            })
            break
          default:
            console.warn(error.code)
            break
        }
      }),

  logInWithGoogle: async (id_token: string) => {
    const auth = getAuth()
    const credential = GoogleAuthProvider.credential(id_token)
    signInWithCredential(auth, credential)
      .then(async res => {
        const token = await res.user.getIdToken()
        const uid = res.user.uid

        const user = await userService.getUser(uid)
        if (user) {
          dispatch(onSetUser(user))
          dispatch(onSetToken(token))
        } else {
          const newUser = createNewUser(uid, res.user.email!)
          await setDoc(doc(firestore, FIRESTORE_ENDPOINT.USERS, res.user.uid), newUser)

          dispatch(onSetUser(newUser))
          dispatch(onSetToken(token))
        }
      })
      .catch(error => {
        // TODO: missing handle error
        console.log(error)
      })
  },

  createUserWithEmailAndPassword: async (username: string, password: string) =>
    createUserWithEmailAndPassword(authentication, username, password)
      .then(async res => {
        const token = await res.user.getIdToken()
        const newUser = createNewUser(res.user.uid, username)

        await setDoc(doc(firestore, FIRESTORE_ENDPOINT.USERS, res.user.uid), newUser)

        dispatch(onSetUser(newUser))
        dispatch(onSetToken(token))

        //TODO: handle show toast
      })
      .catch(error => {
        switch (error.code) {
          case FIREBASE_ERROR_CODE.EMAIL_ALREADY_EXISTS:
            Toast.show({ type: 'error', text1: 'Email already exists' })
            break
          case FIREBASE_ERROR_CODE.TOO_MANY_REQUESTS:
            Toast.show({
              type: 'error',
              text1: 'Too many request',
              text2: 'You tried several times, please try again later'
            })
            break
          default:
            console.warn(error.code)
            break
        }
        console.log(error.code)
      }),

  getUser: async (uid: string) => {
    const snapshot = await getDoc(doc(firestore, `/${FIRESTORE_ENDPOINT.USERS}/${uid}`))

    if (!snapshot.exists()) {
      return undefined
    }

    return snapshot.data() as User
  },

  updateAvatar: async (uri: string) => {
    const { user } = getState('user')
    if (!user) return

    const result = await updateDoc(doc(firestore, FIRESTORE_ENDPOINT.USERS, user.id), {
      avatar: uri
    })
    return result
  },

  getUsersWithKeyWord: async (currentUserId: string, keyword: string) => {
    //TODO: temp solution, will remake later
    const allUser: User[] = []

    const q = query(collection(firestore, FIRESTORE_ENDPOINT.USERS))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(data => {
      const user = data.data() as User
      if (user.name.toLowerCase().includes(keyword.toLowerCase()) && user.id !== currentUserId) {
        allUser.push(user)
      }
    })

    return allUser
  },

  updateFollowingList: async (userId: string, followingList: string[]) => {
    await updateDoc(doc(firestore, `/${FIRESTORE_ENDPOINT.USERS}/${userId}`), {
      followingIDs: followingList
    })
    const newUserState = await userService.getUser(userId)
    if (newUserState) dispatch(onSetUser(newUserState))
  },

  getAllFollowingUser: async (followingIds: string[]) => {
    if (followingIds.length === 0) return

    const followingList: User[] = []
    for (const followingId of followingIds) {
      const user = await userService.getUser(followingId)
      if (user) {
        followingList.push(user)
      }
    }

    return followingList
  },

  getAllFollowerUser: async (uid: string) => {
    let users: User[] = []

    const q = query(
      collection(firestore, FIRESTORE_ENDPOINT.USERS),
      where(FIRESTORE_ENDPOINT.USER_FOLLOWINGIDS, 'array-contains', uid)
    )

    const querySnapshot = await getDocs(q)

    querySnapshot.docs.map(async _doc => {
      if (_doc.exists()) {
        const user = _doc.data() as User
        users.push(user)
      }
    })

    return users
  }
}
