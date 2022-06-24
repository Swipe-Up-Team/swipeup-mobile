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
  apiKey: 'AIzaSyC0mW_-tdDreapLQrj1uAMLqFAPHPkDGnk',
  authDomain: 'swipeupmobile.firebaseapp.com',
  projectId: 'swipeupmobile',
  storageBucket: 'swipeupmobile.appspot.com',
  messagingSenderId: '854332787161',
  appId: '1:854332787161:web:3dfb5a2e426bcdf8c231c8',
  measurementId: 'G-REQ75SJ0R6',
  databaseURL: 'https://swipeupmobile-default-rtdb.asia-southeast1.firebasedatabase.app'
}

export const googleConfig = {
  expoClientId: '854332787161-hbc94u74hvc5v4ov14i4u3v67d5c9lgl.apps.googleusercontent.com',
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
