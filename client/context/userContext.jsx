import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userId, setuserId] = useState(null);
  const [userData, setuserData] = useState(null);
  const [channel,setChannel] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(`/users/${userId}`);
        setuserData(data);
        console.log('from axios', data);
      } catch (err) {
        return <div>Error getting userdata {err}</div>;
      }
    };
    if (!userData && userId) {
      getUser();
    }
  }, [userId, userData]);

  return (
    <UserContext.Provider value={{ userData, setuserData, setuserId, channel, setChannel }}>
      {children}
    </UserContext.Provider>
  );
}
