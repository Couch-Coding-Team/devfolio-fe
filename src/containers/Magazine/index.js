import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Query from "../../components/Query";
import Articles from "./components/Articles";
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
    marginTop: "-84px",
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
        <Query query={ARTICLES_QUERY} sort="published_at:desc">
          {({
            data: {
              articles,
              articlesConnection: {
                aggregate: { count },
              },
            },
            onLoadMore,
          }) => (
            <Articles
              articles={articles}
              onLoadMore={onLoadMore}
              count={count}
            />
          )}
        </Query>
      </Container>
    </>
  );
};

export default Magazine;
