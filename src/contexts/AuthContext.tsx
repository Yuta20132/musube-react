
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;
type AuthContextType = {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await axios.get(`${apiUrl}/users/me`, { withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }, }
        );
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
      }
    })();
  }, []);

  const login = async (email: string, password: string) => {
    await axios.post(`${apiUrl}/users/login/`, {
      email: email,
      password: password
  }, 
  {
      headers: {
          "Content-Type": "application/json"
      },
      withCredentials: true
  });
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await axios.post(
      `${apiUrl}/users/logout/`,
      {},
      {
        withCredentials: true,
      }
    );
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
