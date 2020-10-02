export interface User {
  displayName?: string;
  email: string;
  firstName?: string;
  fullName?: string;
  lastName?: string;
  photoURL?: string;
  uid: string;
}

export interface UserRegistration extends User {
  password: string;
}
