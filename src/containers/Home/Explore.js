import React, { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useQuery } from "@apollo/react-hooks";

import PROJECTS_QUERY from "../../queries/projects";
import PROJECT_IDS_QUERY from "../../queries/projectIds";
import Query from "../../components/Query";
import BlankPage from "../../components/BlankPage";
import Projects from "./Projects";

const LIMIT = 12;

// [KNOWN ISSUE] GraphQL에서 ID 값으로 default sort 해버리는 문제
// https://forum.strapi.io/t/strapi-graphql-default-sort/3021

const Explore = ({ filterIds }) => {
  const [ids, setIds] = useState([]);
  const [page, setPage] = useState(1);
  const {
    loading,
    error,
    data: idData,
    fetchMore: fetchMoreIds,
  } = useQuery(PROJECT_IDS_QUERY, {
    variables: {
      where: {
        tech_stacks: { id: filterIds },
        is_hidden: false,
        published_at_null: false,
      },
    },
  });

  // 프로젝트 순서 셔플
  useEffect(() => {
    if (!idData) return;
    const {
      projects,
      projectsConnection: {
        aggregate: { count },
      },
    } = idData;
    if (count > projects.length) {
      const onLoadMore = (query, start) => {
        fetchMoreIds({
          variables: {
            start,
            where: {
              tech_stacks: { id: filterIds },
              is_hidden: false,
              published_at_null: false,
            },
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            fetchMoreResult[query] = [
              ...prev[query],
              ...fetchMoreResult[query],
            ];
            return fetchMoreResult;
          },
        });
      };
      onLoadMore("projects", projects.length);
    }
    const projectIds = projects.map((proj) => proj.id);
    const shuffled = shuffle(projectIds);
    setIds(shuffled);
  }, [idData]);

  if (loading) return <BlankPage content="Loading..." />;

  const initialProps = {
    limit: window.navigator.userAgent === "ReactSnap" ? undefined : LIMIT,
    query: PROJECTS_QUERY,
    where: {
      id: ids.slice(0, LIMIT),
      tech_stacks: { id: filterIds },
      is_hidden: false,
    },
  };

  return (
    <Query {...initialProps}>
      {({ data: { projects }, onLoadMore }) => {
        const handleLoadMoreData = (query, start) => {
          onLoadMore(query, 0, {
            id: ids.slice(LIMIT * page, LIMIT * (page + 1)),
          });
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

export default Explore;
