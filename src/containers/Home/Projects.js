import React, { useEffect, useState } from "react";
import { makeStyles, Tabs, Tab } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import { orderBy } from "lodash";
import Project from "./Project";
import Search from "../../components/Search";

const ORDER_BY = [
  { label: "최신순", value: "published_at" },
  { label: "좋아요순", value: "like_count" },
  { label: "조회순", value: "view_count" },
];

const Projects = ({ projects, count, onLoadMore }) => {
  const classes = useStyles();
  const [value, setValue] = useState(ORDER_BY[0].value); // 탭 선택값
  const [data, setData] = useState([]); // 전체 리스트

  useEffect(() => {
    setData(
      projects.map((prj) => {
        return { ...prj, like_count: prj.reactions.length };
      })
    );
  }, [projects]);

  const handleTabChange = (event, newValue) => {
    const newLabel = ORDER_BY.find((el) => el.value === newValue).label;
    window.gtag("event", `${newLabel} 클릭`);
    const orderedList = orderBy(data, newValue, "desc");
    setValue(newValue);
    setData(orderedList);
  };

  const handleFilter = (arr) => {
    const list = arr.map((id) => projects.find((proj) => proj.id === id));
    setData(list);
  };

  const handleFilterReset = () => {
    setData(projects);
  };

  const handleLoadMoreData = () => {
    onLoadMore("projects", projects.length);
  };

  return (
    <>
      <div className={classes.bar}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleTabChange}
          aria-label="project list order"
          className={classes.tabs}
        >
          {ORDER_BY.map((order) => (
            <Tab key={order.value} label={order.label} value={order.value} />
          ))}
        </Tabs>
        <Search handleFilter={handleFilter} handleReset={handleFilterReset} />
      </div>
      {!data.length ? (
        <div>결과가없습니다</div>
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
  bar: {
    display: "flex",
    gap: "180px",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      gap: "0",
      flexDirection: "column-reverse",
    },
  },
  tabs: {
    margin: "36px 0",
    [theme.breakpoints.down("sm")]: {
      margin: "24px",
      width: "100%",
    },
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "repeat(1, 1fr)",
      gap: "0",
    },
  },
}));
