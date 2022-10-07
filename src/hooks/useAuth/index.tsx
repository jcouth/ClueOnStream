import axios from 'axios';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { apiToken } from 'services/twitch/api';

interface States {
  token: string;
  loading: boolean;
  invalidState: boolean;
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
  const [loading, setLoading] = useState<States['loading']>(true);
  const [invalidState, setInvalidState] =
    useState<States['invalidState']>(false);

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
      loading,
      invalidState,
      handleToken,
      resetAuth,
    }),
    [handleToken, resetAuth]
  );

  const initToken = () => {
    const { hash } = document.location;
    if (hash.length > 0) {
      const parsedHash = new URLSearchParams(hash.slice(1));
      const accessToken = parsedHash.get('access_token');

      if (accessToken) {
        const state = localStorage.getItem('@ClueOnStream::state');
        const urlState = parsedHash.get('state');
        localStorage.removeItem('@ClueOnStream::state');

        if (state && state === urlState) {
          localStorage.setItem('@ClueOnStream::token', accessToken);
          setToken(accessToken);
        } else {
          setInvalidState(true);
        }
      }
    }
    setLoading(false);
  };

  const checkToken = async () => {
    const currentToken = localStorage.getItem('@ClueOnStream::token');
    if (currentToken) {
      try {
        await apiToken.check(currentToken);
        setToken(currentToken);
        setLoading(false);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          localStorage.removeItem('@ClueOnStream::token');
          initToken();
        }
      }
    } else {
      initToken();
    }
  };

  useEffect(() => {
    void checkToken();
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
