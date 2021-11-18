import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Query from "../../components/Query";
import Groups from "./Groups";
import GROUPS_QUERY from "../../queries/groups";

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    [theme.breakpoints.up("md")]: {
      paddingTop: "60px",
    },
  },
  projectsBg: {
    backgroundColor: "#f9f9f9",
    paddingBottom: "36px",
  },
  banner: {
    padding: "20px 0",
    margin: "20px -15% 80px -15%",
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      margin: "40px -10%",
    },
  },
}));

const Group = () => {
  const classes = useStyles();
  return (
    <Container>
      <Query query={GROUPS_QUERY}>
        {({ data: { groups }, fetchMore }) => (
          <Groups groups={groups} fetchMore={fetchMore} />
        )}
      </Query>
    </Container>
  );
};

export default Group;
