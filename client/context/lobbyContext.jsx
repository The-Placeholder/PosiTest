import { createContext, useState, useContext } from 'react';

// Creating the LobbyContext
export const LobbyContext = createContext({
  lobbyIndex: -1, // Initial state of the lobby index
  setLobbyIndex: () => {}, // Placeholder function for setting the lobby index
});

// LobbyContext Provider Component
export function LobbyContextProvider({ children }) {
  const [lobbyIndex, setLobbyIndex] = useState(0); // State for tracking the lobby index

  return (
    <LobbyContext.Provider value={{ lobbyIndex, setLobbyIndex }}>
      {children}
    </LobbyContext.Provider>
  );
}

// Custom hook for easier access to LobbyContext
export const useLobby = () => useContext(LobbyContext);
