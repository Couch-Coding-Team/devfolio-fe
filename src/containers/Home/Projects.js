import React from "react";
import { makeStyles } from "@material-ui/core";
import { Tabs, Tab } from "@material-ui/core";
import { orderBy } from "lodash";
import Project from "./Project";

const ORDER_BY = [
  { label: "최신순", value: "published_at" },
  { label: "인기순", value: "view_count" },
];

const Projects = ({ projects }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(ORDER_BY[0].value);
  const [orderedProjects, setProjects] = React.useState(projects);

  const handleChange = (event, newValue) => {
    const orderedList = orderBy(projects, newValue, "desc");
    setValue(newValue);
    setProjects(orderedList);
  };
  return (
    <>
      <div className={classes.banner}>
        매주 새로운 포트폴리오가 업데이트 됩니다 👇👇👇
      </div>
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
      {orderedProjects.map((project, i) => {
        return <Project project={project} key={`project__${project.id}`} />;
      })}
    </>
  );
};

export default Projects;

const useStyles = makeStyles((theme) => ({
  banner: {
    padding: "20px 0",
    margin: "20px -15% 80px -15%",
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      margin: "40px -10% 80px -10%",
    },
  },
  tabs: {
    margin: "36px auto",
  },
}));
