import { useContext, useEffect, useState } from "react";
import { apiRequest, formatDate } from "../../utils/util-functions";
import { CardDrawer, PageSection, TopBar } from "../../utils/util-styles";
import Toolbar from "../common/Toolbar";
import { Color, Member, Order } from "../../utils/util-interfaces";
import MemberCard from "../MemberCard";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router";
import { CONSTANTS } from "../../data/constants";
import Toaster from "../common/Toaster";
import EmptyBanner from "../common/EmptyBanner";
import CustomButton from "../common/CustomButton";

const Home = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState<Array<Member>>([]);
  const [ascOrder, setAscOrder] = useState<boolean>(true);
  const { session } = useContext(LoginContext);
  const [openToaster, setOpenToaster] = useState<boolean>(false);
  const [color, setColor] = useState<Color>("success");
  const [toasterMessage, setToasterMessage] = useState<string>("");

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
          {session !== "" && (
            <CustomButton
              handleClick={() => navigate("/admin")}
              buttonText={CONSTANTS.BUTTON.ADMIN}
            />
          )}
          <CustomButton
            handleClick={() => handleSort(ascOrder ? "asc" : "desc")}
            buttonText={CONSTANTS.BUTTON.DATE}
            ascOrder={ascOrder}
          />
        </TopBar>
        <CardDrawer>
          {members.length > 0 &&
            members.map((member, index) => (
              <MemberCard key={index} {...member} />
            ))}
        </CardDrawer>
        {!members.length && <EmptyBanner />}
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

export default Home;
