import React from "react";
import Project from "./Project";
import { makeStyles } from "@material-ui/core";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";

const Projects = ({ projects }) => {
  const classes = useStyles();
  // const [value, setValue] = React.useState(0);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  return (
    <>
      {/* <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
        style={{ margin: "36px auto" }}
      >
        <Tab label="최신순" />
        <Tab label="인기순" />
      </Tabs> */}
      <div className={classes.banner}>
        매주 새로운 포트폴리오가 업데이트 됩니다 👇👇👇
      </div>
      {projects.map((project, i) => {
        return <Project project={project} key={`project__${project.id}`} />;
      })}
    </>
  );
};

export default Projects;

const useStyles = makeStyles((theme) => ({
  banner: {
    padding: "20px 0",
    margin: "20px -50% 80px -50%",
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      margin: "40px -50% 80px -50%",
    },
  },
}));
