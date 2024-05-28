import { useContext } from "react";
import { LoginContext } from "./context/LoginContext";
import { useLocation } from "react-router";
import { startCase } from "../utils/util-functions";
import {
  Font,
  Button,
  FlexBox,
  LogoImgStyle,
  NavBar,
  NavItem,
} from "../utils/util-styles";
import Logo from "../assets/logo.png";

const Toolbar = () => {
  const { session, setSession } = useContext(LoginContext);
  const location = useLocation();
  const currentPage = location.pathname.substring(1);

  return (
    <NavBar>
      <NavItem align="left" pointer>
        <FlexBox>
          <img style={LogoImgStyle} src={Logo} />
          <Font light weight="600">
            Reading Club
          </Font>
        </FlexBox>
      </NavItem>
      <NavItem>
        <Font light weight="600">
          {currentPage === "" ? "Home" : startCase(currentPage)}
        </Font>
      </NavItem>
      <NavItem align="right">
        {session === "" ? (
          <Button
            onClick={() => {
              setSession("key");
            }}
          >
            Login
          </Button>
        ) : (
          <Button
            onClick={() => {
              setSession("");
            }}
          >
            Logout
          </Button>
        )}
      </NavItem>
    </NavBar>
  );
};

export default Toolbar;
