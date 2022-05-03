// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDXd1fFnDjSpQj83a8KrzgjCaWLqWpZBXI',
  authDomain: 'swipeup-be.firebaseapp.com',
  projectId: 'swipeup-be',
  storageBucket: 'swipeup-be.appspot.com',
  messagingSenderId: '98158434111',
  appId: '1:98158434111:web:f05c3310f5beaeab0e258a',
  measurementId: 'G-X0JK3SXC5P'
}

export const googleConfig = {
  expoClientId: '930850910016-5rb4npm0s0gq311vch2po94v3t0cnh85.apps.googleusercontent.com',
  iosClientId: '930850910016-67rctlc36n4tet7m41edtk47otqi3vf1.apps.googleusercontent.com',
  androidClientIid: '930850910016-j2ipne89ndk77rsidvs2s81fvpn0sqg7.apps.googleusercontent.com',
  scopes: ['profile', 'email']
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const authentication = getAuth(app)
