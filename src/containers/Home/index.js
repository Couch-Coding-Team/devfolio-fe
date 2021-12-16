import React, { useState } from "react";
import { Container, makeStyles } from "@material-ui/core";
import { sortBy } from "lodash";

import PROJECTS_QUERY from "../../queries/projects";
import Query from "../../components/Query";
import { ORDER_BY } from "../../constants";

import Hero from "./Hero";
import Projects from "./Projects";
import ListHeader from "./ListHeader";
import Explore from "./Explore";

const useStyles = makeStyles((theme) => ({
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
}));

const getDataInLikeDesc = (projects) => {
  const listWithLikeCount = projects.map((proj) => {
    return { ...proj, like_count: proj.reactions.length };
  });
  const orderedList = sortBy(listWithLikeCount, ["like_count"]).reverse();
  return orderedList;
};

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

  const commonProps = {
    query: PROJECTS_QUERY,
    where: { tech_stacks: { id: filterIds }, is_hidden: false },
  };

  // 좋아요순 정렬은 백엔드 방법 찾을때까지 프론트에서 처리
  const queryProps =
    tabValue === "like_count"
      ? commonProps
      : {
          limit: window.navigator.userAgent === "ReactSnap" ? undefined : 12,
          sort: `${tabValue}:desc`,
          ...commonProps,
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
          {tabValue === "random" ? (
            <Explore filterIds={filterIds} />
          ) : (
            <Query {...queryProps}>
              {({
                data: {
                  projects,
                  projectsConnection: {
                    aggregate: { count },
                  },
                },
                onLoadMore,
              }) => {
                // 좋아요순 정렬은 백엔드 방법 찾을때까지 프론트에서 처리
                if (tabValue === "like_count") {
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
                } else {
                  return (
                    <Projects
                      projects={projects}
                      count={count}
                      onLoadMore={onLoadMore}
                    />
                  );
                }
              }}
            </Query>
          )}
        </Container>
      </div>
    </>
  );
};

export default Home;
