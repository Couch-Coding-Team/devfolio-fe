import React from "react";
import { useQuery } from "@apollo/react-hooks";
import BlankPage from "./BlankPage";

const Query = ({
  children,
  query,
  slug,
  start = 0,
  limit = undefined,
  sort = undefined,
  where = undefined,
  onCompleted,
}) => {
  const initialWhere = { published_at_null: false, ...(where && where) };
  const { data, loading, error, fetchMore } = useQuery(query, {
    variables: {
      slug,
      start,
      limit,
      sort,
      where: initialWhere,
    },
    onCompleted,
  });

  const onLoadMore = (query, start, extraWhere = undefined) => {
    fetchMore({
      variables: {
        start,
        where: {
          ...initialWhere,
          ...(extraWhere && extraWhere),
        },
      },
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
