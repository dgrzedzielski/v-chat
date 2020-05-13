export interface User {
  photoURL: string | null;
  email: string;
  uid: string;
  displayName: string | null;
}

export interface UpdateProfileModel {
  displayName?: string;
  photoURL?: string;
}
