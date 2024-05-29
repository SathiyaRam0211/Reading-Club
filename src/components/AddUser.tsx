import { Dispatch, SetStateAction, useState } from "react";
import {
  AddUserCard,
  Button,
  CustomInputStyle,
  FlexBox,
  Font,
} from "../utils/util-styles";
import { Color, Gender, Member } from "../utils/util-interfaces";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import {
  apiRequest,
  formatDDMMYY,
  uuidv4,
  validateEmail,
} from "../utils/util-functions";
import { CONSTANTS } from "../data/constants";

const AddUser = ({
  setAddUser,
  getMembers,
  setOpenToaster,
  setToasterMessage,
  setColor,
}: {
  setAddUser: Dispatch<SetStateAction<boolean>>;
  getMembers: () => void;
  setOpenToaster: Dispatch<SetStateAction<boolean>>;
  setToasterMessage: Dispatch<SetStateAction<string>>;
  setColor: Dispatch<SetStateAction<Color>>;
}) => {
  const [username, setUsername] = useState<string>("");
  const [books, setBooks] = useState<string>("");
  const [gender, setGender] = useState<Gender>("female");

  const handleSubmit = () => {
    if (username !== "" && books !== "") {
      if (!validateEmail(username)) {
        setToasterMessage(CONSTANTS.MESSAGE.VALID_EMAIL);
        setColor("warning");
        setOpenToaster(true);
        return;
      }
      const newMember: Member = {
        id: uuidv4(),
        username: username,
        gender: gender,
        dateOfJoining: formatDDMMYY(new Date()),
        books: books.split(",").map((book) => book.trim()),
      };
      apiRequest(CONSTANTS.URL, "POST", newMember).then((res) => {
        if (res.error === null) {
          setToasterMessage(CONSTANTS.MESSAGE.ADDED_MEMBER);
          setColor("success");
          setOpenToaster(true);
          getMembers();
          setAddUser(false);
        } else {
          setToasterMessage(res.error);
          setColor("error");
          setOpenToaster(true);
        }
        return;
      });
    } else {
      setToasterMessage(CONSTANTS.MESSAGE.FILL_FIELDS);
      setColor("warning");
      setOpenToaster(true);
    }
  };

  return (
    <FlexBox $justifyContent="center" style={{ paddingTop: "32px" }}>
      <AddUserCard>
        <Font $weight="600">{CONSTANTS.LABEL.USERNAME + " *"}</Font>
        <input
          type="text"
          style={CustomInputStyle}
          value={username}
          placeholder="abc@def.com"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        ></input>
        <Font $weight="600">{CONSTANTS.LABEL.BOOKS + " *"}</Font>
        <textarea
          rows={5}
          style={CustomInputStyle}
          value={books}
          onChange={(event) => {
            setBooks(event.target.value);
          }}
        ></textarea>
        <Font $weight="600">{CONSTANTS.LABEL.GENDER + " *"}</Font>
        <RadioGroup
          row
          name="row-radio-buttons-group"
          value={gender}
          onChange={(event) => setGender(event.target.value as Gender)}
        >
          <FormControlLabel
            value="female"
            control={<Radio color="warning" />}
            label="Female"
          />
          <FormControlLabel
            value="male"
            control={<Radio color="warning" />}
            label="Male"
          />
        </RadioGroup>
        <FlexBox $justifyContent="space-between" style={{ paddingTop: "32px" }}>
          <Button onClick={() => setAddUser(false)}>Back</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </FlexBox>
      </AddUserCard>
    </FlexBox>
  );
};

export default AddUser;
