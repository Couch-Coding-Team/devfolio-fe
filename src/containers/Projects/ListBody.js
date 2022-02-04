import React from "react";
import Projects from "./components/Projects";
// import { LikeSort, RandomSort } from ".";

const ListBody = ({ tabValue, filterIds, projects }) => {
  // 랜덤 정렬은 백엔드 방법 찾을때까지 프론트에서 처리
  // if (tabValue === "random") return <RandomSort filterIds={filterIds} />;
  // 좋아요순 정렬은 백엔드 방법 찾을때까지 프론트에서 처리
  // if (tabValue === "like_count") return <LikeSort filterIds={filterIds} />;

  return <Projects projects={projects} count={projects.length} />;
};

export default ListBody;
