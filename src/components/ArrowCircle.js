import React from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const ArrowCircle = ({ style }) => {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        backgroundColor: "white",
        borderRadius: "100%",
        position: "relative",
        ...style,
      }}
    >
      <ArrowForwardIosIcon
        fontSize="inherit"
        color="primary"
        style={{ position: "absolute", top: "2px", left: "3px" }}
      />
    </div>
  );
};

export default ArrowCircle;
