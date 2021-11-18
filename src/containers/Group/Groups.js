import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import Search from "../../components/Search";

const Groups = ({ groups, fetchMore }) => {
  const classes = useStyles();
  const [data, setData] = useState(groups); // 무한스크롤 렌더링 리스트

  const handleFilter = (arr) => {
    const list = arr.map((id) => groups.find((group) => group.id === id));
    setData(list);
  };

  const handleReset = () => {
    setData(groups);
  };

  return (
    <>
      <div className={classes.bar}>
        <Search handleFilter={handleFilter} handleReset={handleReset} />
      </div>
      {!data.length ? (
        <div>결과가없습니다</div>
      ) : (
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMore}
          hasMore={data.length !== groups.length}
          className={classes.grid}
        >
          {data.map((project, i) => (
            <></>
          ))}
        </InfiniteScroll>
      )}
    </>
  );
};

export default Groups;

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
