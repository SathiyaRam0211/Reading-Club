import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Snackbar } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { FontAwesomeIconStyle } from "../../utils/util-styles";
import { Color } from "../../utils/util-interfaces";

const Toaster = ({
  openToaster,
  setOpenToaster,
  toasterMessage,
  color,
}: {
  openToaster: boolean;
  setOpenToaster: Dispatch<SetStateAction<boolean>>;
  toasterMessage: string;
  color: Color;
}) => {
  const handleToasterClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return event;
    }

    setOpenToaster(false);
  };

  const Action = (
    <FontAwesomeIcon
      icon={faXmark}
      style={FontAwesomeIconStyle}
      onClick={handleToasterClose}
    />
  );

  return (
    <Snackbar
      open={openToaster}
      autoHideDuration={2000}
      onClose={handleToasterClose}
      action={Action}
    >
      <Alert
        onClose={handleToasterClose}
        severity={color}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {toasterMessage}
      </Alert>
    </Snackbar>
  );
};

export default Toaster;
