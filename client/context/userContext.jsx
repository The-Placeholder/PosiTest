import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!userData) {
      axios.get('/users').then(({ data }) => {
        setUserData(data);
      });
    }
    console.log(userData);
  }, []);

  <UserContext.Provider value={{ userData, setUserData }}>
    {children}
  </UserContext.Provider>;
}
