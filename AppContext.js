import React, { useContext, useState, useEffect } from 'react';
import { readFromStorage } from './utils';
import { STORAGE_KEY_PUSH_TOKEN } from './constants/Storage';

const Config = React.createContext({
  token: '',
  hasToken: false,
  setToken: () => {},
});

export const useAppContext = () => useContext(Config);

export const AppContext = ({ children }) => {
  const [token, setToken] = useState('');
  const [hasToken, setHasToken] = useState(false);

  useEffect(()=>{
    async function getPushToken() {
      try {
        const token = await readFromStorage(STORAGE_KEY_PUSH_TOKEN);
        if (token === null) return;
        setToken(token);
        setHasToken(true);
      } catch (e) {
        console.error(e);
      }
    }
    getPushToken();
  }, []);

  const context = { token, setToken, hasToken };

  return <Config.Provider value={context}>{children}</Config.Provider>;
};
