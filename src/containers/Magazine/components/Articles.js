import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Article from "./Article";

const Articles = ({ articles, onLoadMore, count }) => {
  const fetchMore = () => {
    if (articles.length < count) {
      onLoadMore("articles", articles.length);
    }
  };
  return (
    <InfiniteScroll
      dataLength={articles.length}
      next={fetchMore}
      hasMore={articles.length !== count}
      style={{ overflow: "visible" }}
      loader={<span>Loading...</span>}
    >
      {articles.map((article, i) => (
        <Article key={i} article={article} />
      ))}
    </InfiniteScroll>
  );
};

export default Articles;
