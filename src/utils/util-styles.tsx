import styled, { keyframes } from "styled-components";
import { FlexItemProps, FontProps, NavItemProps } from "./util-interfaces";

const light = "#FFFDF0";
const primary = "#FFDC5F";
const secondary = "#E9B824";
const dark = "#212121";

export const LogoImgStyle = {
  height: "48px",
  marginRight: "8px",
};

export const MemberImgStyle = {
  height: "200px",
  marginBottom: "16px",
  borderRadius: "8px",
};

export const BannerImgStyle = {
  width: "520px",
  marginTop: "16px",
  borderRadius: "8px",
  display: "block",
};

export const FontAwesomeIconStyle = {
  fontSize: "14px",
  margin: "0 8px",
  cursor: "pointer",
};

export const CustomInputStyle = {
  display: "block",
  borderRadius: "12px",
  border: `1px solid ${primary}`,
  outline: "none",
  padding: "8px",
  margin: "12px 0",
  fontSize: "14px",
  color: dark,
  backgroundColor: light,
  width: "300px",
};

export const EllipsisStyle = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "180px",
};

export const FlexBox = styled.div<FlexItemProps>`
  display: flex;
  align-items: ${(props) => (props.$alignItems ? props.$alignItems : "center")};
  justify-content: ${(props) =>
    props.$justifyContent ? props.$justifyContent : "flex-start"};
  flex-direction: ${(props) =>
    props.$flexDirection ? props.$flexDirection : "row"};
`;

export const Font = styled.span<FontProps>`
  font-size: ${(props) => (props.$size ? props.$size : "16px")};
  color: ${(props) => (props.$light === "true" ? light : dark)};
  font-weight: ${(props) => (props.$weight ? props.$weight : 400)};
`;

export const PageSection = styled.section`
  height: calc(100vh - 80px - 64px);
  background: ${primary};
  padding: 32px;
`;

export const NavBar = styled.nav`
  background: ${dark};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

export const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavItem = styled.div<NavItemProps>`
  text-align: ${(props) => (props.$align ? props.$align : "center")};
  width: 200px;
  cursor: ${(props) => (props.$pointer === "true" ? "pointer" : "auto")};
  &:nth-child(2) {
    margin: 0 auto;
  }
`;

export const Button = styled.button`
  border: 1px solid ${secondary};
  border-radius: 8px;
  padding: 8px 16px;
  background: ${light};
  color: ${dark};
  font-weight: 600;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    background: ${secondary};
    color: ${light};
    transform: scale(1.1);
  }
`;

export const Count = styled.div`
  text-align: center;
  line-height: 32px;
  margin-left: 8px;
  background: ${light};
  border-radius: 50%;
  width: 32px;
  height: 32px;
`;

export const CardDrawer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  height: calc(100vh - 148px);
  overflow-y: scroll;
`;

export const Card = styled.div`
  margin: 16px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 1px solid ${secondary};
  background: ${light};
  height: fit-content;
  width: 320px;
  border-radius: 12px;
  transition: 0.5s;
  cursor: pointer;
  &:hover {
    background: ${primary};
  }
`;

export const CardRow = styled.div`
  width: 280px;
  display: flex;
  justify-content: space-between;
`;

export const CardInfo = styled.div`
  margin: 0px 8px;
  padding-top: 16px;
  background: transparent;
`;

export const CardBadge = styled.div`
  display: inline-flex;
  padding: 4px 6px;
  margin: 4px;
  background: ${light};
  border-radius: 6px;
`;

export const MemberListDrawer = styled.div`
  background: ${light};
  margin: 32px 0;
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
`;

const popUpAnimation = keyframes`
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;

export const Dialog = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: ${popUpAnimation} 0.5s ease-out;
  z-index: 10;
`;

export const AddUserCard = styled.div`
  background: ${light};
  height: fit-content;
  width: 320px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid ${secondary};
  margin: 16px 32px;
`;

export const Banner = styled.div`
  padding: 16px;
  border-radius: 12px;
  background: ${light};
  text-align: center;
`;
