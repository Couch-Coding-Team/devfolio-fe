import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import ArticleCard from "./ArticleCard";

const Articles = ({ articles, fetchMore }) => {
  const classes = useStyles();
  const [data, setData] = useState(articles); // 무한스크롤 렌더링 리스트

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchMore}
      hasMore={data.length !== articles.length}
      className={classes.grid}
    >
      {data.map((article, i) => (
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
