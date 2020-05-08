import { firebaseAuth } from 'core/firebase';

class AuthService {
  static async signIn(email: string, password: string) {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  static async signUp(email: string, password: string) {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
  }
}

export default AuthService;
