import React from "react";
import { makeStyles } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import ArticleCard from "./ArticleCard";

const Articles = ({ articles, fetchMore, count }) => {
  const classes = useStyles();

  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchMore}
      hasMore={articles.length !== count}
      className={classes.grid}
    >
      {articles.map((article, i) => (
        <ArticleCard key={i} article={article} />
      ))}
    </InfiniteScroll>
  );
};

export default Articles;

const useStyles = makeStyles((theme) => ({
  bar: {
    display: "flex",
    gap: "180px",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      gap: "0",
      flexDirection: "column-reverse",
    },
  },
  tabs: {
    margin: "36px 0",
    [theme.breakpoints.down("sm")]: {
      margin: "24px",
      width: "100%",
    },
  },
  grid: {},
}));
