import React from "react";
import { styled } from "@mui/material/styles";
import InfiniteScroll from "react-infinite-scroll-component";
import Project from "./Project";

const Projects = ({ projects, count, onLoadMore }) => {
  const handleLoadMoreData = () => {
    if (projects.length < count) {
      onLoadMore("projects", projects.length);
    }
  };

  if (!projects.length) return <div>결과가 없습니다</div>;

  return (
    <Root>
      <InfiniteScroll
        dataLength={projects.length}
        next={handleLoadMoreData}
        hasMore={projects.length !== count}
        className="projectsGrid"
        loader={<span>Loading...</span>}
      >
        {projects.map((project, i) => (
          <Project project={project} key={`project__${project.strapiId}`} />
        ))}
      </InfiniteScroll>
    </Root>
  );
};

export default Projects;

const Root = styled("div")(({ theme }) => ({
  ".projectsGrid": {
    overflow: "visible",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
    [theme.breakpoints.between("xs", "md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
}));
