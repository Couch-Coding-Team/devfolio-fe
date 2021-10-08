import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Tabs, Tab } from "@material-ui/core";
import { orderBy } from "lodash";
import Project from "./Project";
import Search from "../../components/Search";

const ORDER_BY = [
  { label: "최신순", value: "published_at" },
  { label: "좋아요순", value: "like_count" },
  { label: "조회순", value: "view_count" },
];

const Projects = ({ projects }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(ORDER_BY[0].value);
  const [data, setData] = React.useState(
    projects.map((prj) => {
      return { ...prj, like_count: prj.reactions.length };
    })
  );

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
      {!data.length ? (
        <div>결과가없습니다</div>
      ) : (
        <Grid container spacing={2}>
          {data.map((project, i) => (
            <Grid item xs={12} sm={4}>
              <Project project={project} key={`project__${project.id}`} />
            </Grid>
          ))}
        </Grid>
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
}));
