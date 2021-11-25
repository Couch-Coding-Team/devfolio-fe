import React from "react";
import { useQuery } from "@apollo/react-hooks";
import BlankPage from "./BlankPage";

const Query = ({
  children,
  query,
  slug,
  start = 0,
  limit = undefined,
  sort = "published_at:desc",
  where = undefined,
  onCompleted,
}) => {
  const { data, loading, error, fetchMore } = useQuery(query, {
    variables: {
      slug,
      start,
      limit,
      sort,
      where: { is_hidden: false, ...(where && where) },
    },
    onCompleted,
  });

  const onLoadMore = (query, start) => {
    fetchMore({
      variables: { start },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        fetchMoreResult[query] = [...prev[query], ...fetchMoreResult[query]];
        return fetchMoreResult;
      },
    });
  };

  if (loading) return <BlankPage content="Loading..." />;
  if (error) return <BlankPage content={`Error: ${JSON.stringify(error)}`} />;
  return children({ data, onLoadMore });
};

export default Query;
