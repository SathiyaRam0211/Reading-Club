import { Member } from "../utils/util-interfaces";
import {
  Card,
  CardRow,
  CardInfo,
  CardBadge,
  Font,
  MemberImgStyle,
} from "../utils/util-styles";
import Male from "../assets/male-vector.jpg";
import Female from "../assets/female-vector.jpg";
import { useState } from "react";
import { CONSTANTS } from "../data/constants";

const MemberCard = ({ id, username, dateOfJoining, gender, books }: Member) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);

  return (
    <Card
      key={id}
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
    >
      <img
        src={gender === "male" ? Male : Female}
        style={MemberImgStyle}
        alt="gender-place-holder"
      />
      <CardRow>
        <Font $weight="600">{CONSTANTS.LABEL.USERNAME}</Font>
        <Font>{username}</Font>
      </CardRow>
      <CardRow>
        <Font $weight="600">{CONSTANTS.LABEL.DATE}</Font>
        <Font>{dateOfJoining}</Font>
      </CardRow>
      {showInfo && (
        <CardInfo>
          {books.map((book, index) => (
            <CardBadge key={`${id}${index}`}>{book}</CardBadge>
          ))}
        </CardInfo>
      )}
    </Card>
  );
};

export default MemberCard;
