import React, { createContext, useContext, useMemo, useState } from 'react';

interface States {
  token: string;
  authenticated: boolean;
}

interface StateActions extends States {
  handleToken: React.Dispatch<React.SetStateAction<States['token']>>;
  handleAuthenticated: React.Dispatch<
    React.SetStateAction<States['authenticated']>
  >;
}

interface AuthContextData extends StateActions {
  resetAuth: () => void;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<States['token']>('');
  const [authenticated, setAuthenticated] =
    useState<States['authenticated']>(false);

  const resetAuth = () => {
    setToken('');
    setAuthenticated(false);
  };

  const provider = useMemo(
    () => ({
      token,
      authenticated,
      handleToken: setToken,
      handleAuthenticated: setAuthenticated,
      resetAuth,
    }),
    [setToken, setAuthenticated, resetAuth]
  );

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
