import React, { useState, useEffect } from "react";
import {
  Container,
  Dialog,
  DialogActions,
  makeStyles,
  Button,
} from "@material-ui/core";
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
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("popupClose")) {
      handleClose();
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseForever = () => {
    window.gtag("event", "다시 보지 않기 클릭");
    localStorage.setItem("popupClose", "true");
    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <img src={"/assets/popup.png"} alt="event_popup" />
        <DialogActions>
          <Button
            color="primary"
            variant="contained"
            href="https://www.notion.so/React-2e2088b4797d4167af547f17a71abfc3"
            target="_blank"
            onClick={() => window.gtag("event", "이벤트 확인하러 가기 클릭")}
          >
            이벤트 확인하러 가기
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleCloseForever}
          >
            다시 보지 않기
          </Button>
        </DialogActions>
      </Dialog>
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
