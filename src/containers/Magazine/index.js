import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Query from "../../components/Query";
import Articles from "./Articles";
import ARTICLES_QUERY from "../../queries/articles";
import Hero from "./Hero";

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    padding: "24px 120px",
    [theme.breakpoints.down("sm")]: {
      padding: "32px",
    },
  },
  heroBg: {
    backgroundColor: "#EEECE2",
  },
  articlesContainer: {
    marginTop: "-64px",
    padding: 0,
  },
}));

const Magazine = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.heroBg}>
        <Container className={classes.heroContainer}>
          <Hero />
        </Container>
      </div>
      <Container className={classes.articlesContainer}>
        <Query query={ARTICLES_QUERY}>
          {({
            data: {
              articles,
              articlesConnection: {
                aggregate: { count },
              },
            },
            fetchMore,
          }) => (
            <Articles articles={articles} fetchMore={fetchMore} count={count} />
          )}
        </Query>
      </Container>
    </>
  );
};

export default Magazine;
