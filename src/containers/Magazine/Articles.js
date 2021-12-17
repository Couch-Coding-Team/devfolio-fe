import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ArticleCard from "./ArticleCard";

const Articles = ({ articles, fetchMore, count }) => {
  // TODO: add limit
  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchMore}
      hasMore={articles.length !== count}
      style={{ overflow: "visible" }}
    >
      {articles.map((article, i) => (
        <ArticleCard key={i} article={article} />
      ))}
    </InfiniteScroll>
  );
};

export default Articles;
