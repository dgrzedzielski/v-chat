export default {
  common: {
    openDrawer: 'Open drawer',
    submit: 'Submit',
    logout: 'Logout',
  },

  errors: {
    'auth/user-not-found': 'User not found',
    'auth/invalid-email': 'Email is invalid',
    'auth/wrong-password': 'Wrong password',
    'auth/email-already-in-use': 'Email is already in use',
    'auth/weak-password': 'Password is too weak',
    'auth/too-many-requests':
      'You reached out requests limit, wait a moment and try again',
    'chat/sending-message': 'Error while sending message. Try again',
  },

  auth: {
    signIn: 'Sign In',
    createAccount: 'Create account',
    email: 'Email address',
    password: 'Password',
  },

  chat: {
    noMessages: `There's no messages yet. Let's write something`,
    typeMessage: 'Type your message here...',
  },

  settings: {
    initialProfileSettings: 'Enter your initial profile settings',
    displayName: 'Display name',
  },
};
