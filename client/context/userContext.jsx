import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      let data = await axios.get('/users');
      setUserData(data);
      console.log('userdata:', data);
    };
    if (!userData) {
      getUser();
    }
  }, []);

  <UserContext.Provider value={{ userData, setUserData }}>
    {children}
  </UserContext.Provider>;
}
