import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Article from "./Article";

const Articles = ({ articles, fetchMore, count }) => {
  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchMore}
      hasMore={articles.length !== count}
      style={{ overflow: "visible" }}
    >
      {articles.map((article, i) => (
        <Article key={i} article={article} />
      ))}
    </InfiniteScroll>
  );
};

export default Articles;
