import { firebaseAuth } from 'core/firebase';
import { UpdateProfileModel } from 'modules/auth/types';

class AuthService {
  static async signIn(email: string, password: string) {
    return firebaseAuth.signInWithEmailAndPassword(email, password);
  }

  static async signUp(email: string, password: string) {
    return firebaseAuth.createUserWithEmailAndPassword(email, password);
  }

  static async updateProfile(data: UpdateProfileModel) {
    return firebaseAuth.currentUser?.updateProfile(data);
  }

  static logout() {
    return firebaseAuth.signOut();
  }
}

export default AuthService;
