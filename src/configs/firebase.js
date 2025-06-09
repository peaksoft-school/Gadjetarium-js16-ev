import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
   apiKey: 'AIzaSyAmRw0iR8o89r525-6bNsk1aln7d_HV1RY',
   authDomain: 'elaman-86eb2.firebaseapp.com',
   projectId: 'elaman-86eb2',
   storageBucket: 'elaman-86eb2.appspot.com',
   messagingSenderId: '109939961650735218698',
   appId: '1:109939961650735218698:web:abc123def456',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
   try {
      const result = await signInWithPopup(auth, googleProvider)
      const idToken = await result.user.getIdToken()
      return { idToken, email: result.user.email }
   } catch (error) {
      console.error('Google Auth Error:', error)
      throw error
   }
}
   
export const logoutFirebase = async () => {
   await auth.signOut()
}

export default auth
