import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  FlexBox,
  Font,
  FontAwesomeIconStyle,
} from "../../utils/util-styles";
import {
  faArrowDown,
  faArrowRight,
  faArrowUp,
  faHouse,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const CustomButton = ({
  handleClick,
  buttonText,
  ascOrder = null,
}: {
  handleClick: () => void;
  buttonText: string;
  ascOrder?: boolean | null;
}) => {
  const ButtonIcon = () => {
    switch (buttonText) {
      case "Date":
        return ascOrder ? (
          <FontAwesomeIcon icon={faArrowUp} style={FontAwesomeIconStyle} />
        ) : (
          <FontAwesomeIcon icon={faArrowDown} style={FontAwesomeIconStyle} />
        );
      case "Admin":
        return (
          <FontAwesomeIcon icon={faArrowRight} style={FontAwesomeIconStyle} />
        );
      case "Home":
        return <FontAwesomeIcon icon={faHouse} style={FontAwesomeIconStyle} />;
      case "New Member":
        return <FontAwesomeIcon icon={faPlus} style={FontAwesomeIconStyle} />;
      default:
        return <></>;
    }
  };

  return (
    <Button onClick={handleClick}>
      <FlexBox>
        <Font $weight="600" $size="14px">
          {buttonText}
        </Font>
        <ButtonIcon />
      </FlexBox>
    </Button>
  );
};

export default CustomButton;
