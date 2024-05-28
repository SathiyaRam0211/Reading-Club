import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type SessionType = string | undefined;

interface LoginContextType {
  session: SessionType;
  setSession: Dispatch<SetStateAction<SessionType>>;
}

export const LoginContext = createContext<LoginContextType>({
  session: "",
  setSession: () => {},
});
LoginContext.displayName = "LoginContext";

interface LoginContextProviderProps {
  children: ReactNode;
}

const LoginContextProvider: React.FC<LoginContextProviderProps> = ({
  children,
}) => {
  const [session, setSession] = useState<SessionType>("");
  return (
    <LoginContext.Provider value={{ session, setSession }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
