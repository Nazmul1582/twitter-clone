import React, { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [appContext, setAppContext] = useState({});

  return (
    <AppContext.Provider value={[appContext, setAppContext]}>
      {children}
    </AppContext.Provider>
  );
}
