import { Banner, BannerImgStyle, FlexBox, Font } from "../../utils/util-styles";
import EmptyState from "../../assets/empty-vector.jpg";
import { CONSTANTS } from "../../data/constants";

const EmptyBanner = () => {
  return (
    <FlexBox
      $justifyContent="center"
      style={{ marginTop: "32px", width: "100%" }}
    >
      <Banner>
        <Font $weight="600">{CONSTANTS.LABEL.NO_MEMBERS}</Font>
        <img src={EmptyState} style={BannerImgStyle} />
      </Banner>
    </FlexBox>
  );
};

export default EmptyBanner;
