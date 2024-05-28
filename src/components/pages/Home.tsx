import { useContext, useEffect, useState } from "react";
import { apiRequest, formatDate } from "../../utils/util-functions";
import {
  Button,
  CardDrawer,
  FlexBox,
  Font,
  FontAwesomeIconStyle,
  PageSection,
  TopBar,
} from "../../utils/util-styles";
import Toolbar from "../Toolbar";
import { Member } from "../../utils/util-interfaces";
import MemberCard from "../MemberCard";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowRight,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { URL } from "../../data/constants";

type Order = "asc" | "desc";

const Home = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<Array<Member>>([]);
  const [ascOrder, setAscOrder] = useState<boolean>(true);
  const { session } = useContext(LoginContext);

  const handleSort = (order: Order) => {
    setAscOrder((current) => !current);
    const sortedArr: Array<Member> = [...members].sort((a, b) => {
      return order === "asc"
        ? formatDate(a.dateOfJoining).getTime() -
            formatDate(b.dateOfJoining).getTime()
        : formatDate(b.dateOfJoining).getTime() -
            formatDate(a.dateOfJoining).getTime();
    });
    setMembers(sortedArr);
  };

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
          {session !== "" && (
            <Button onClick={() => navigate("/admin")}>
              <FlexBox>
                <Font weight="600" size="14px">
                  Admin
                </Font>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  style={FontAwesomeIconStyle}
                />
              </FlexBox>
            </Button>
          )}
          <Button onClick={() => handleSort(ascOrder ? "asc" : "desc")}>
            <FlexBox>
              <Font weight="600" size="14px">
                Date
              </Font>
              {ascOrder ? (
                <FontAwesomeIcon
                  icon={faArrowUp}
                  style={FontAwesomeIconStyle}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faArrowDown}
                  style={FontAwesomeIconStyle}
                />
              )}
            </FlexBox>
          </Button>
        </TopBar>
        <CardDrawer>
          {members &&
            members.length > 0 &&
            members.map((member, index) => (
              <MemberCard key={index} {...member} />
            ))}
        </CardDrawer>
      </PageSection>
    </>
  );
};

export default Home;
