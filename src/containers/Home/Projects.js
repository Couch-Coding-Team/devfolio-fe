import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import Project from "./Project";

const Projects = ({ projects, count, onLoadMore }) => {
  const classes = useStyles();
  const [data, setData] = useState([]); // 전체 리스트

  useEffect(() => {
    setData(
      projects.map((prj) => {
        return { ...prj, like_count: prj.reactions.length };
      })
    );
  }, [projects]);

  const handleLoadMoreData = () => {
    onLoadMore("projects", projects.length);
  };

  return (
    <>
      {!data.length ? (
        <div>결과가 없습니다</div>
      ) : (
        <InfiniteScroll
          dataLength={data.length}
          next={handleLoadMoreData}
          hasMore={data.length !== count}
          className={classes.grid}
          loader={<span>Loading...</span>}
        >
          {data.map((project, i) => (
            <Project project={project} key={`project__${project.id}`} />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
};

export default Projects;

const useStyles = makeStyles((theme) => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(1, 1fr)",
      gap: "0",
    },
  },
}));
