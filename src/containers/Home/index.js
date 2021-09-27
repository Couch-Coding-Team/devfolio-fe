import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import PROJECTS_QUERY from "../../queries/projects";
import Query from "../../components/Query";
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
}));

const Home = () => {
  const classes = useStyles();
  return (
    <>
      <Container className={classes.heroContainer}>
        <Hero />
      </Container>
      <div className={classes.projectsBg}>
        <Container>
          <Query query={PROJECTS_QUERY}>
            {({ data: { projects } }) => <Projects projects={projects} />}
          </Query>
        </Container>
      </div>
    </>
  );
};

export default Home;
