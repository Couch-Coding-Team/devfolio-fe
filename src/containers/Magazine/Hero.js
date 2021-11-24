import React from "react";
import { makeStyles, Button, Grid } from "@material-ui/core";

const Hero = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={4} style={{ backgroundColor: "#EEECE2" }}>
      <Grid item xs={12} md={6} className={classes.heroMain}>
        <p>다른 개발자들은 어떤 프로젝트를 만들었을까?</p>
        <div className={classes.heroMessage}>
          개발자 토이프로젝트 모아보기 서비스
        </div>
        <div className={classes.mdHidden}>
          <img className={classes.heroImage} src="assets/hero.jpg" alt="hero" />
        </div>
      </Grid>
      <Grid item xs={12} md={6} className={classes.smHidden}>
        <img className={classes.heroImage} src="assets/hero.jpg" alt="hero" />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  logo: {
    width: "100%",
    margin: "20px auto",
    [theme.breakpoints.up("md")]: {
      width: "80%",
      margin: "40px auto 20px auto",
    },
  },
  heroMain: {
    "& p": {
      fontSize: "18px",
      margin: 0,
      [theme.breakpoints.down("sm")]: {
        marginTop: "40px",
        textAlign: "center",
      },
    },
  },
  heroMessage: {
    fontSize: "24px",
    marginBottom: "40px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 0,
    },
  },
  heroImage: {
    width: "100%",
  },
  button: {
    margin: "36px 12px 12px 0",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "0 0 12px 0",
    },
  },
  mdHidden: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  smHidden: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export default Hero;
