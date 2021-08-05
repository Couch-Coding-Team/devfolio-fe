import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Container } from "@material-ui/core";

const Query = ({ children, query, slug }) => {
  const { data, loading, error } = useQuery(query, {
    variables: { slug: slug },
  });

  if (loading)
    return (
      <Container style={{ height: "800px", textAlign: "center" }}>
        Loading...
      </Container>
    );
  if (error) return <Container>Error: {JSON.stringify(error)}</Container>;
  return children({ data });
};

export default Query;
