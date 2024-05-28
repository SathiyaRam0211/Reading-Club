import "./App.css";
import AppRoutes from "./components/AppRoutes";
import LoginContextProvider from "./components/context/LoginContext";

function App() {
  return (
    <LoginContextProvider>
      <AppRoutes />
    </LoginContextProvider>
  );
}

export default App;
