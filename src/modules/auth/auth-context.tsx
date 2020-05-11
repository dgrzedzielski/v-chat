import React from 'react';
import { User } from 'firebase';
import { firebaseAuth } from 'core/firebase';
import { Children } from 'core/common-types';

type AuthContextValue = {
  user: User | null;
  isReady: boolean;
};

type AuthProviderProps = {
  children: Children;
};

const defaultValue: AuthContextValue = {
  user: null,
  isReady: false,
};

const AuthContext = React.createContext<AuthContextValue>(defaultValue);
AuthContext.displayName = 'AuthContext';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(defaultValue.user);
  const [isReady, setIsReady] = React.useState<boolean>(defaultValue.isReady);

  React.useEffect(() => {
    firebaseAuth.onAuthStateChanged((newUser) => {
      setUser(newUser);
      setIsReady(true);
    });
  }, []);

  const value = React.useMemo<AuthContextValue>(() => ({ user, isReady }), [
    user,
    isReady,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};
