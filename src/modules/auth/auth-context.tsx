import React from 'react';
import { firebaseAuth } from 'core/firebase';
import { Children } from 'core/common-types';
import { User } from './types';

type AuthContextValue = {
  user: User | null;
  isReady: boolean;
  updateUser: (userData: Partial<User>) => void;
};

type AuthProviderProps = {
  children: Children;
};

const defaultValue: AuthContextValue = {
  user: null,
  isReady: false,
  updateUser: () => {},
};

const AuthContext = React.createContext<AuthContextValue>(defaultValue);
AuthContext.displayName = 'AuthContext';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(defaultValue.user);
  const [isReady, setIsReady] = React.useState<boolean>(defaultValue.isReady);

  React.useEffect(() => {
    firebaseAuth.onAuthStateChanged((newUser) => {
      if (newUser) {
        setUser({
          displayName: newUser.displayName,
          email: newUser.email!,
          photoURL: newUser.photoURL,
          uid: newUser.uid,
        });
      } else {
        setUser(null);
      }
      setIsReady(true);
    });
  }, []);

  const updateUser = React.useCallback((newData: Partial<User>) => {
    setUser((currentUser) => {
      if (currentUser) {
        return { ...currentUser, ...newData };
      }

      return currentUser;
    });
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({ user, isReady, updateUser }),
    [user, isReady, updateUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};
