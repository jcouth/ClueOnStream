import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface States {
  token: string;
}

interface AuthContextData extends States {
  handleToken: (_: States['token']) => void;
  resetAuth: () => void;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<States['token']>('');

  const handleToken = (value: States['token']) => {
    localStorage.setItem('@ClueOnStream::token', value);
    setToken(value);
  };

  const resetAuth = () => {
    localStorage.removeItem('@ClueOnStream::token');
    setToken('');
  };

  const provider = useMemo(
    () => ({
      token,
      handleToken,
      resetAuth,
    }),
    [handleToken, resetAuth]
  );

  useEffect(() => {
    const localToken = localStorage.getItem('@ClueOnStream::token');
    if (localToken && !token) {
      setToken(localToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={provider}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
