import { Dispatch, SetStateAction } from "react";
import {
  Backdrop,
  Button,
  Dialog,
  FlexBox,
  Font,
} from "../../utils/util-styles";
import { CONSTANTS } from "../../data/constants";

const CustomDialog = ({
  alertOpen,
  setAlertOpen,
  handleDelete,
  currentMember,
}: {
  alertOpen: boolean;
  setAlertOpen: Dispatch<SetStateAction<boolean>>;
  handleDelete: (id: string) => void;
  currentMember: string;
}) => {
  return (
    alertOpen && (
      <Backdrop onClick={() => setAlertOpen(false)}>
        <Dialog onClick={(e) => e.stopPropagation()}>
          <Font>{CONSTANTS.LABEL.DELETE_USER}</Font>
          <FlexBox
            $justifyContent="space-between"
            style={{ paddingTop: "32px" }}
          >
            <Button onClick={() => setAlertOpen(false)}>
              {CONSTANTS.BUTTON.NO}
            </Button>
            <Button onClick={() => handleDelete(currentMember)}>
              {CONSTANTS.BUTTON.DELETE}
            </Button>
          </FlexBox>
        </Dialog>
      </Backdrop>
    )
  );
};

export default CustomDialog;
