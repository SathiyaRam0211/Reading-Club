import {
  Button,
  FlexBox,
  Font,
  FontAwesomeIconStyle,
  PageSection,
  TopBar,
} from "../../utils/util-styles";
import Toolbar from "../Toolbar";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import MemberList from "../MemberList";
import { useEffect, useState } from "react";
import { Member } from "../../utils/util-interfaces";
import { apiRequest } from "../../utils/util-functions";
import { URL } from "../../data/constants";
import AddUser from "../AddUser";

const Admin = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<Array<Member>>([]);
  const [addUser, setAddUser] = useState<boolean>(false);

  const getMembers = (): void => {
    apiRequest(URL, "GET").then((res) => {
      if (res.error === null) setMembers(res.data);
      else {
        console.log(res.error);
      }
    });
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <>
      <Toolbar />
      <PageSection>
        <TopBar>
          <Button onClick={() => navigate("/")}>
            <FlexBox>
              <FontAwesomeIcon
                icon={faArrowLeft}
                style={FontAwesomeIconStyle}
              />
              <Font weight="600" size="14px">
                Home
              </Font>
            </FlexBox>
          </Button>
          <Button onClick={() => setAddUser(true)}>
            <FlexBox>
              <Font weight="600" size="14px">
                New Member
              </Font>
              <FontAwesomeIcon icon={faPlus} style={FontAwesomeIconStyle} />
            </FlexBox>
          </Button>
          {/* <FlexBox>
            <Font weight="600">Total Users</Font>
            <Count>
              <Font weight="600">{members.length}</Font>
            </Count>
          </FlexBox> */}
        </TopBar>
        {addUser ? (
          <AddUser setAddUser={setAddUser} />
        ) : (
          <MemberList list={members} getMembers={getMembers} />
        )}
      </PageSection>
    </>
  );
};

export default Admin;
