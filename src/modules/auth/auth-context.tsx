import React from 'react';
import { firebaseAuth } from 'core/firebase';
import { User } from 'firebase';

type AuthContextProps = {
  user: User | null;
  isReady: boolean;
};

type AuthProviderProps = {
  children: React.ReactChild;
};

const defaultValue: AuthContextProps = {
  user: null,
  isReady: false,
};

const AuthContext = React.createContext<AuthContextProps>(defaultValue);
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

  const value = React.useMemo<AuthContextProps>(() => ({ user, isReady }), [
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
