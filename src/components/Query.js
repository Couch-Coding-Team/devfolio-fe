import React from "react";
import { useQuery } from "@apollo/react-hooks";
import BlankPage from "./BlankPage";

const Query = ({ children, query, slug, onCompleted }) => {
  const { data, loading, error } = useQuery(query, {
    variables: { slug: slug },
    onCompleted,
  });

  if (loading) return <BlankPage content="Loading..." />;
  if (error) return <BlankPage content={`Error: ${JSON.stringify(error)}`} />;
  return children({ data });
};

export default Query;
