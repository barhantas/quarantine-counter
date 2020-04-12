import React, { useContext, useState } from 'react';
import { readFromStorage } from './utils';
import { STORAGE_KEY_PUSH_TOKEN } from './constants/Storage';

const Config = React.createContext({
  token: '',
  hasToken: false,
  setToken: () => {},
});

export const useConfig = () => useContext(Config);

export const AppContext = ({ children }) => {
  const [token, setToken] = useState('');

  async function getPushToken() {
    try {
      const token = await readFromStorage(STORAGE_KEY_PUSH_TOKEN);
      setToken(token);
      setFlavor(flavor);
    } catch (e) {
      console.error(e);
    }
  }

  getPushToken();

  const hasToken = () => token !== '';

  const context = { token, setToken, hasToken };

  return <Config.Provider value={context}>{children}</Config.Provider>;
};
