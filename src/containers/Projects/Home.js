import React, { useState } from "react";
import { Container, makeStyles } from "@material-ui/core";
import { ORDER_BY } from "../../constants";
import { Hero, ListHeader, ListBody } from ".";

const Home = () => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(
    window.navigator.userAgent === "ReactSnap"
      ? "like_count" // 빌드에서는 무한스크롤 없이 모든 프로젝트 가져오기
      : ORDER_BY[0].value
  );
  const [filterIds, setFilter] = useState(undefined); // 검색값

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    const newLabel = ORDER_BY.find((el) => el.value === newValue).label;
    window.gtag("event", `${newLabel} 클릭`);
  };

  const handleFilter = (arr) => {
    setFilter(arr);
  };

  const handleFilterReset = () => {
    setFilter(undefined);
  };

  return (
    <>
      <Container>
        <Hero />
      </Container>
      <div className={classes.projectsBg}>
        <Container>
          <ListHeader
            handleTabChange={handleTabChange}
            tabValue={tabValue}
            handleFilter={handleFilter}
            handleFilterReset={handleFilterReset}
            filterIds={filterIds}
          />
          <ListBody tabValue={tabValue} filterIds={filterIds} />
        </Container>
      </div>
    </>
  );
};

export default Home;

const useStyles = makeStyles((theme) => ({
  projectsBg: {
    backgroundColor: "#f9f9f9",
    paddingBottom: "36px",
  },
}));
