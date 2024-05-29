import { ReactNode, createContext, useEffect, useState } from "react";
import { LoginContextType } from "../../utils/util-interfaces";

export const LoginContext = createContext<LoginContextType>({
  session: "",
  setSession: () => {},
});
LoginContext.displayName = "LoginContext";

const LoginContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<string>("");
  useEffect(() => {
    if (session !== "") sessionStorage.setItem("key", session);
    else sessionStorage.removeItem("key");
  }, [session]);
  return (
    <LoginContext.Provider value={{ session, setSession }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
