import React from "react";
import { shuffle } from "lodash";
import { useQuery } from "@apollo/react-hooks";

import PROJECTS_QUERY from "../../queries/projects";
import PROJECT_IDS_QUERY from "../../queries/projectIds";
import Query from "../../components/Query";
import BlankPage from "../../components/BlankPage";
import Projects from "./Projects";

const LIMIT = 12;

const Explore = ({ filterIds }) => {
  const { loading, error, data, fetchMore } = useQuery(PROJECT_IDS_QUERY, {
    variables: {
      where: {
        tech_stacks: { id: filterIds },
        is_hidden: false,
        published_at_null: false,
      },
    },
  });
  if (loading) return <BlankPage content="Loading..." />;

  const {
    projects,
    projectsConnection: {
      aggregate: { count },
    },
  } = data;

  if (count > projects.length) {
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
    onLoadMore("projects", projects.length);
  }

  // 프로젝트 셔플
  const projectIds = projects.map((proj) => proj.id);
  const shuffled = shuffle(projectIds);
  const sliced = shuffled.slice(0, LIMIT);
  console.log(sliced, shuffled); // 원래 배열을 mutate 하는걸로 -> 스크롤 내릴때마다 12, 24, 36, ...

  const queryProps = {
    limit: window.navigator.userAgent === "ReactSnap" ? undefined : 12,
    query: PROJECTS_QUERY,
    where: { id: sliced, tech_stacks: { id: filterIds }, is_hidden: false },
  };

  return (
    <Query {...queryProps}>
      {({
        data: {
          projects,
          projectsConnection: {
            aggregate: { count },
          },
        },
        onLoadMore, // TODO: 무한스크롤 처리
      }) => {
        return <Projects projects={projects} />;
      }}
    </Query>
  );
};

export default Explore;
