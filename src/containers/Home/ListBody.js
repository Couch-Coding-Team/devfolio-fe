import React from "react";
import PROJECTS_QUERY from "../../queries/projects";
import Query from "../../components/Query";
import Projects from "./Projects";
import Explore from "./Explore";
import Like from "./Like";
import { QUERY_LIMIT } from "../../constants";

const ListBody = ({ tabValue, filterIds }) => {
  // 랜덤 정렬은 백엔드 방법 찾을때까지 프론트에서 처리
  if (tabValue === "random") return <Explore filterIds={filterIds} />;
  // 좋아요순 정렬은 백엔드 방법 찾을때까지 프론트에서 처리
  if (tabValue === "like_count") return <Like filterIds={filterIds} />;
  return (
    <Query
      query={PROJECTS_QUERY}
      limit={window.navigator.userAgent !== "ReactSnap" && QUERY_LIMIT}
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
