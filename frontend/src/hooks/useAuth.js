import { useState } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const saveToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  return {
    token,
    setToken: saveToken,
  };
};