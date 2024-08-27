import { createContext, useState } from "react";

export const Context = createContext({ isAuthenticated: false });
const AppWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const [user, setUser] = useState({});

  return (
    <Context.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppWrapper;
