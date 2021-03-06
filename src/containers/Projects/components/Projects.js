import React from "react";
import { makeStyles } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import Project from "./Project";

const Projects = ({ projects, count, onLoadMore }) => {
  const classes = useStyles();

  const handleLoadMoreData = () => {
    if (projects.length < count) {
      onLoadMore("projects", projects.length);
    }
  };

  if (!projects.length) return <div>결과가 없습니다</div>;

  return (
    <InfiniteScroll
      dataLength={projects.length}
      next={handleLoadMoreData}
      hasMore={projects.length !== count}
      className={classes.grid}
      loader={<span>Loading...</span>}
    >
      {projects.map((project, i) => (
        <Project project={project} key={`project__${project.id}`} />
      ))}
    </InfiniteScroll>
  );
};

export default Projects;

const useStyles = makeStyles((theme) => ({
  grid: {
    overflow: "visible",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
    [theme.breakpoints.between("xs", "sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.down("xs")]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
}));
