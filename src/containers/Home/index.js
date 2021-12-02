import React, { useState } from "react";
import { Container, makeStyles, Tabs, Tab } from "@material-ui/core";

import PROJECTS_QUERY from "../../queries/projects";
import Query from "../../components/Query";
import Search from "../../components/Search";
import Hero from "./Hero";
import Projects from "./Projects";

const useStyles = makeStyles((theme) => ({
  heroContainer: {
    [theme.breakpoints.up("md")]: {
      paddingTop: "60px",
    },
  },
  projectsBg: {
    backgroundColor: "#f9f9f9",
    paddingBottom: "36px",
  },
  banner: {
    padding: "20px 0",
    margin: "20px -15% 80px -15%",
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      margin: "40px -10%",
    },
  },
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
}));

const ORDER_BY = [
  { label: "최신순", value: "published_at" },
  // { label: "좋아요순", value: "like_count" },
  { label: "조회순", value: "view_count" },
];

const Home = () => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(ORDER_BY[0].value); // 탭 선택값
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
      <Container className={classes.heroContainer}>
        <Hero />
      </Container>
      <div className={classes.projectsBg}>
        <Container>
          <Query
            query={PROJECTS_QUERY}
            limit={window.navigator.userAgent === "ReactSnap" ? undefined : 12}
            sort={`${tabValue}:desc`}
            where={{
              is_hidden: false,
              ...(filterIds && { tech_stacks: { id: filterIds } }),
            }}
          >
            {({
              data: {
                projects,
                projectsConnection: {
                  aggregate: { count },
                },
              },
              onLoadMore,
            }) => (
              <>
                <div className={classes.bar}>
                  <Tabs
                    value={tabValue}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleTabChange}
                    aria-label="project list order"
                    className={classes.tabs}
                  >
                    {ORDER_BY.map((order) => (
                      <Tab
                        key={order.value}
                        label={order.label}
                        value={order.value}
                      />
                    ))}
                  </Tabs>
                  <Search
                    filterIds={filterIds}
                    handleFilter={handleFilter}
                    handleReset={handleFilterReset}
                  />
                </div>
                <Projects
                  projects={projects}
                  count={count}
                  onLoadMore={onLoadMore}
                />
              </>
            )}
          </Query>
        </Container>
      </div>
    </>
  );
};

export default Home;
