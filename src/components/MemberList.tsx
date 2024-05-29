import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Color, Member } from "../utils/util-interfaces";
import {
  EllipsisStyle,
  FontAwesomeIconStyle,
  MemberListDrawer,
} from "../utils/util-styles";
import { apiRequest, startCase } from "../utils/util-functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction, useState } from "react";
import { CONSTANTS } from "../data/constants";
import CustomDialog from "./common/CustomDialog";
import EmptyBanner from "./common/EmptyBanner";

const MemberList = ({
  list,
  getMembers,
  setOpenToaster,
  setToasterMessage,
  setColor,
}: {
  list: Array<Member>;
  getMembers: () => void;
  setOpenToaster: Dispatch<SetStateAction<boolean>>;
  setToasterMessage: Dispatch<SetStateAction<string>>;
  setColor: Dispatch<SetStateAction<Color>>;
}) => {
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [currentMember, setCurretMember] = useState<string>("");

  const handleDelete = (memberId: string): void => {
    if (memberId === "") {
      setToasterMessage("Unknown Member!");
      setColor("error");
      setOpenToaster(true);
      return;
    }
    apiRequest(`${CONSTANTS.URL}/${memberId}`, "DELETE").then((res) => {
      if (res.error === null) {
        setAlertOpen(false);
        setToasterMessage(`Member ${res.data.username} Deleted Successfully!`);
        setColor("success");
        setOpenToaster(true);
        getMembers();
      } else {
        setToasterMessage(res.error);
        setColor("error");
        setOpenToaster(true);
      }
    });
  };

  return (
    <>
      {list && list.length > 0 && (
        <MemberListDrawer>
          <TableContainer sx={{ maxHeight: "calc(100vh - 212px)" }}>
            <Table
              sx={{ minWidth: 650 }}
              stickyHeader
              aria-label="members table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>{CONSTANTS.LABEL.S_NO}</TableCell>
                  <TableCell>{CONSTANTS.LABEL.USERNAME}</TableCell>
                  <TableCell>{CONSTANTS.LABEL.GENDER}</TableCell>
                  <TableCell>{CONSTANTS.LABEL.BOOKS}</TableCell>
                  <TableCell>{CONSTANTS.LABEL.DATE}</TableCell>
                  <TableCell>{CONSTANTS.LABEL.ACTION}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>{startCase(row.gender)}</TableCell>
                    <TableCell style={EllipsisStyle}>
                      {row.books.join(", ")}
                    </TableCell>
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
      )}
      {!list.length && <EmptyBanner />}
      <CustomDialog
        alertOpen={alertOpen}
        setAlertOpen={setAlertOpen}
        handleDelete={handleDelete}
        currentMember={currentMember}
      />
    </>
  );
};

export default MemberList;
