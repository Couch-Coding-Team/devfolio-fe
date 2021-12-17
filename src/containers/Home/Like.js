import React from "react";
import { sortBy } from "lodash";
import PROJECTS_QUERY from "../../queries/projects";
import Query from "../../components/Query";
import Projects from "./Projects";

const getDataInLikeDesc = (projects) => {
  const listWithLikeCount = projects.map((proj) => {
    return { ...proj, like_count: proj.reactions.length };
  });
  const orderedList = sortBy(listWithLikeCount, ["like_count"]).reverse();
  return orderedList;
};

const Like = ({ filterIds }) => {
  return (
    <Query
      query={PROJECTS_QUERY}
      where={{ tech_stacks: { id: filterIds }, is_hidden: false }}
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
        if (count > projects.length) {
          onLoadMore("projects", projects.length);
        }
        return (
          <Projects
            projects={getDataInLikeDesc(projects)}
            count={count}
            onLoadMore={() => {}} // 무한스크롤 없이 한번에 모든 데이터 쿼리
          />
        );
      }}
    </Query>
  );
};

export default Like;
