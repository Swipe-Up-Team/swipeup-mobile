// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

// const firebaseConfig = {
//   apiKey: 'AIzaSyDXd1fFnDjSpQj83a8KrzgjCaWLqWpZBXI',
//   authDomain: 'swipeup-be.firebaseapp.com',
//   projectId: 'swipeup-be',
//   storageBucket: 'swipeup-be.appspot.com',
//   messagingSenderId: '98158434111',
//   appId: '1:98158434111:web:f05c3310f5beaeab0e258a',
//   measurementId: 'G-X0JK3SXC5P',
//   databaseURL: 'https://swipeup-be-default-rtdb.asia-southeast1.firebasedatabase.app'
// }

const firebaseConfig = {
  apiKey: 'AIzaSyAjhpBtEDO54PHFKvnojYpMK1myvKMKIsc',
  authDomain: 'swipeupnew.firebaseapp.com',
  projectId: 'swipeupnew',
  storageBucket: 'swipeupnew.appspot.com',
  messagingSenderId: '361722468609',
  appId: '1:361722468609:web:236582ed58667daeb7e300',
  measurementId: 'G-JJNRFP28S5',
  databaseURL: 'https://swipeupnew-default-rtdb.asia-southeast1.firebasedatabase.app'
}

export const googleConfig = {
  expoClientId: '361722468609-fbbmju9u6k54if4o99s64i0srh86h2ac.apps.googleusercontent.com',
  iosClientId: '930850910016-67rctlc36n4tet7m41edtk47otqi3vf1.apps.googleusercontent.com',
  androidClientIid: '930850910016-j2ipne89ndk77rsidvs2s81fvpn0sqg7.apps.googleusercontent.com',
  scopes: ['profile', 'email']
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const authentication = getAuth(app)
export const firestore = getFirestore(app)
export const database = getDatabase(app)
export const storage = getStorage(app)
