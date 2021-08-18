import React from "react";
import { Container } from "@material-ui/core";

const BlankPage = ({ content }) => {
  return (
    <Container
      maxWidth="sm"
      style={{ height: "600px", padding: "104px", textAlign: "center" }}
    >
      {content}
    </Container>
  );
};

export default BlankPage;
