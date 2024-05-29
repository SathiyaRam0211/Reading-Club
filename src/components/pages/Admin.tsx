import {
  Count,
  FlexBox,
  Font,
  PageSection,
  TopBar,
} from "../../utils/util-styles";
import Toolbar from "../common/Toolbar";
import { useNavigate } from "react-router";
import MemberList from "../MemberList";
import { useEffect, useState } from "react";
import { Color, Member } from "../../utils/util-interfaces";
import { apiRequest } from "../../utils/util-functions";
import { CONSTANTS } from "../../data/constants";
import AddUser from "../AddUser";
import Toaster from "../common/Toaster";
import CustomButton from "../common/CustomButton";

const Admin = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<Array<Member>>([]);
  const [addUser, setAddUser] = useState<boolean>(false);
  const [openToaster, setOpenToaster] = useState<boolean>(false);
  const [color, setColor] = useState<Color>("success");
  const [toasterMessage, setToasterMessage] = useState<string>("");

  const getMembers = (): void => {
    apiRequest(CONSTANTS.URL, "GET").then((res) => {
      if (res.error === null) {
        if (!res.data.length) {
          setToasterMessage(CONSTANTS.MESSAGE.NO_MEMBERS);
          setColor("error");
          setOpenToaster(true);
        }
        setMembers(res.data);
      } else {
        setToasterMessage(res.error);
        setColor("error");
        setOpenToaster(true);
      }
    });
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <>
      <Toolbar
        setOpenToaster={setOpenToaster}
        setColor={setColor}
        setToasterMessage={setToasterMessage}
      />
      <PageSection>
        <TopBar>
          <CustomButton
            buttonText={CONSTANTS.BUTTON.HOME}
            handleClick={() => navigate("/")}
          />
          <FlexBox>
            <Font $weight="600">{CONSTANTS.LABEL.TOTAL_USERS}</Font>
            <Count>
              <Font $weight="600">{members.length}</Font>
            </Count>
          </FlexBox>
          <CustomButton
            buttonText={CONSTANTS.BUTTON.NEW_MEMBER}
            handleClick={() => setAddUser(true)}
          />
        </TopBar>
        {addUser ? (
          <AddUser
            setAddUser={setAddUser}
            getMembers={getMembers}
            setOpenToaster={setOpenToaster}
            setColor={setColor}
            setToasterMessage={setToasterMessage}
          />
        ) : (
          <MemberList
            list={members}
            getMembers={getMembers}
            setOpenToaster={setOpenToaster}
            setColor={setColor}
            setToasterMessage={setToasterMessage}
          />
        )}
        <Toaster
          openToaster={openToaster}
          setOpenToaster={setOpenToaster}
          color={color}
          toasterMessage={toasterMessage}
        />
      </PageSection>
    </>
  );
};

export default Admin;
