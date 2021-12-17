import React, { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useQuery } from "@apollo/react-hooks";

import PROJECTS_QUERY from "../../queries/projects";
import PROJECT_IDS_QUERY from "../../queries/projectIds";
import Query from "../../components/Query";
import BlankPage from "../../components/BlankPage";
import Projects from "./components/Projects";
import { QUERY_LIMIT } from "../../constants";

// [KNOWN ISSUE] GraphQL에서 ID 값으로 default sort 해버리는 문제
// https://forum.strapi.io/t/strapi-graphql-default-sort/3021

const RandomSort = ({ filterIds }) => {
  const [ids, setIds] = useState([]);
  const [page, setPage] = useState(1);

  const getIdsToQuery = (pg) =>
    ids.slice(QUERY_LIMIT * pg, QUERY_LIMIT * (pg + 1));

  const initialWhere = {
    tech_stacks: { id: filterIds },
    is_hidden: false,
    published_at_null: false,
  };

  const {
    loading,
    data: idData,
    fetchMore: fetchMoreIds,
  } = useQuery(PROJECT_IDS_QUERY, {
    variables: {
      where: initialWhere,
    },
  });

  useEffect(() => {
    if (!idData) return;
    const {
      projects,
      projectsConnection: {
        aggregate: { count },
      },
    } = idData;

    if (count > projects.length) {
      handleFetchMoreId(projects.length);
    }
    const shuffled = shuffle(projects.map((proj) => proj.id));
    setIds(shuffled);
  }, [idData]);

  const handleFetchMoreId = (start) => {
    fetchMoreIds({
      variables: {
        start,
        where: initialWhere,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        fetchMoreResult.projects = [
          ...prev.projects,
          ...fetchMoreResult.projects,
        ];
        return fetchMoreResult;
      },
    });
  };

  if (loading) return <BlankPage content="Loading..." />;

  return (
    <Query
      query={PROJECTS_QUERY}
      limit={QUERY_LIMIT}
      where={{ id: getIdsToQuery(0), ...initialWhere }}
    >
      {({ data: { projects }, onLoadMore }) => {
        const handleLoadMoreData = (query, start) => {
          onLoadMore(query, 0, { id: getIdsToQuery(page) });
          setPage(page + 1);
        };
        return (
          <Projects
            projects={projects}
            count={idData.projectsConnection.aggregate.count}
            onLoadMore={handleLoadMoreData}
          />
        );
      }}
    </Query>
  );
};

export default RandomSort;
