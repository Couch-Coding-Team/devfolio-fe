import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Query from "../../components/Query";
import Articles from "./Articles";
import ARTICLES_QUERY from "../../queries/articles";
import Hero from "./Hero";

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

const Magazine = () => {
  const classes = useStyles();
  return (
    <>
      <Hero />
      <Container>
        <Query query={ARTICLES_QUERY}>
          {({ data: { articles }, fetchMore }) => (
            <Articles articles={articles} fetchMore={fetchMore} />
          )}
        </Query>
      </Container>
    </>
  );
};

export default Magazine;
