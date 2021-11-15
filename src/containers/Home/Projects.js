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

const ITEMS_PER_PAGE = 12;

const Projects = ({ projects }) => {
  const classes = useStyles();
  const [value, setValue] = useState(ORDER_BY[0].value); // 탭 선택값
  const [data, setData] = useState(
    projects.map((prj) => {
      return { ...prj, like_count: prj.reactions.length };
    })
  ); // 전체 리스트
  const [items, setItems] = useState(data); // 무한스크롤 렌더링 리스트

  useEffect(() => {
    setItems(data.slice(0, ITEMS_PER_PAGE));
  }, [data]);

  const fetchMoreData = () => {
    // data에서 기존 items 항목을 제외한 나머지 중 첫 ITEMS_PER_PAGE 개 추가
    setItems([
      ...items,
      ...data.slice(items.length, items.length + ITEMS_PER_PAGE),
    ]);
  };

  const handleChange = (event, newValue) => {
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

  const handleReset = () => {
    setData(projects);
  };

  return (
    <>
      <div className={classes.bar}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="project list order"
          className={classes.tabs}
        >
          {ORDER_BY.map((order) => (
            <Tab key={order.value} label={order.label} value={order.value} />
          ))}
        </Tabs>
        <Search handleFilter={handleFilter} handleReset={handleReset} />
      </div>
      {!items.length ? (
        <div>결과가없습니다</div>
      ) : (
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={items.length !== data.length}
          className={classes.grid}
        >
          {items.map((project, i) => (
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
