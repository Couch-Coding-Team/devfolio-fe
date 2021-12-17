import React from "react";
import PROJECTS_QUERY from "../../queries/projects";
import Query from "../../components/Query";
import { QUERY_LIMIT } from "../../constants";
import Projects from "./components/Projects";
import { LikeSort, RandomSort } from ".";

const ListBody = ({ tabValue, filterIds }) => {
  // 랜덤 정렬은 백엔드 방법 찾을때까지 프론트에서 처리
  if (tabValue === "random") return <RandomSort filterIds={filterIds} />;
  // 좋아요순 정렬은 백엔드 방법 찾을때까지 프론트에서 처리
  if (tabValue === "like_count") return <LikeSort filterIds={filterIds} />;
  return (
    <Query
      query={PROJECTS_QUERY}
      limit={QUERY_LIMIT}
      where={{ tech_stacks: { id: filterIds }, is_hidden: false }}
      sort={`${tabValue}:desc`}
    >
      {({
        data: {
          projects,
          projectsConnection: {
            aggregate: { count },
          },
        },
        onLoadMore,
      }) => {
        return (
          <Projects projects={projects} count={count} onLoadMore={onLoadMore} />
        );
      }}
    </Query>
  );
};

export default ListBody;
