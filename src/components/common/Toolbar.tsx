import { Dispatch, SetStateAction, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { useLocation, useNavigate } from "react-router";
import { startCase, uuidv4 } from "../../utils/util-functions";
import {
  Font,
  Button,
  FlexBox,
  LogoImgStyle,
  NavBar,
  NavItem,
} from "../../utils/util-styles";
import Logo from "../../assets/logo.png";
import { CONSTANTS } from "../../data/constants";
import { Color } from "../../utils/util-interfaces";

const Toolbar = ({
  setOpenToaster,
  setToasterMessage,
  setColor,
}: {
  setOpenToaster: Dispatch<SetStateAction<boolean>>;
  setToasterMessage: Dispatch<SetStateAction<string>>;
  setColor: Dispatch<SetStateAction<Color>>;
}) => {
  const { session, setSession } = useContext(LoginContext);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = location.pathname.substring(1);

  return (
    <NavBar>
      <NavItem $align="left" $pointer="true">
        <FlexBox onClick={() => navigate("/")}>
          <img style={LogoImgStyle} src={Logo} />
          <Font $light="true" $weight="600">
            {CONSTANTS.LABEL.BRAND}
          </Font>
        </FlexBox>
      </NavItem>
      <NavItem>
        <Font $light="true" $weight="600">
          {currentPage === "" ? "Home" : startCase(currentPage)}
        </Font>
      </NavItem>
      <NavItem $align="right">
        {session === "" ? (
          <Button
            onClick={() => {
              setSession(uuidv4());
              setToasterMessage(CONSTANTS.MESSAGE.LOGIN);
              setColor("success");
              setOpenToaster(true);
            }}
          >
            {CONSTANTS.BUTTON.LOGIN}
          </Button>
        ) : (
          <Button
            onClick={() => {
              setSession("");
              setToasterMessage(CONSTANTS.MESSAGE.LOGOUT);
              setColor("success");
              setOpenToaster(true);
            }}
          >
            {CONSTANTS.BUTTON.LOGOUT}
          </Button>
        )}
      </NavItem>
    </NavBar>
  );
};

export default Toolbar;
