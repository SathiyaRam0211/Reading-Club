import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Member } from "../utils/util-interfaces";
import {
  Backdrop,
  Button,
  Dialog,
  FlexBox,
  Font,
  FontAwesomeIconStyle,
  MemberListDrawer,
} from "../utils/util-styles";
import { apiRequest, startCase } from "../utils/util-functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { URL } from "../data/constants";

const MemberList = ({
  list,
  getMembers,
}: {
  list: Array<Member>;
  getMembers: () => void;
}) => {
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [currentMember, setCurretMember] = useState<string>("");

  const handleDelete = (memberId: string): void => {
    if (memberId === "") {
      console.log("Unknown Member");
      return;
    }
    apiRequest(`${URL}/${memberId}`, "DELETE").then((res) => {
      if (res.error === null) {
        setAlertOpen(false);
        getMembers();
      } else {
        console.log(res.error);
      }
    });
  };

  return (
    <>
      <MemberListDrawer>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="members table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Books</TableCell>
                <TableCell>Date Joined</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list &&
                list.length > 0 &&
                list.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{startCase(row.gender)}</TableCell>
                    <TableCell>{row.books.join(", ")}</TableCell>
                    <TableCell>{row.dateOfJoining}</TableCell>
                    <TableCell>
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        style={FontAwesomeIconStyle}
                        onClick={() => {
                          setAlertOpen(true);
                          setCurretMember(row.id);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MemberListDrawer>
      {alertOpen && (
        <Backdrop onClick={() => setAlertOpen(false)}>
          <Dialog onClick={(e) => e.stopPropagation()}>
            <Font>Are you surely want to delete the member?</Font>
            <FlexBox
              justifyContent="space-between"
              style={{ paddingTop: "32px" }}
            >
              <Button onClick={() => setAlertOpen(false)}>No</Button>
              <Button onClick={() => handleDelete(currentMember)}>
                Yes, Delete
              </Button>
            </FlexBox>
          </Dialog>
        </Backdrop>
      )}
    </>
  );
};

export default MemberList;
