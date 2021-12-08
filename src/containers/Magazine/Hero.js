import React from "react";
import { makeStyles, Grid } from "@material-ui/core";

const Hero = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} md={6} className={classes.heroMain}>
        <p>토이 프로젝트와 DevFoliOh의 비하인드 스토리</p>
        <div className={classes.heroMessage}>
          DevFoliOh 매거진에서
          <br /> 확인해보세요
        </div>
      </Grid>
      <Grid item xs={12} md={6} className={classes.smHidden}>
        <img
          className={classes.heroImage}
          src="assets/hero_magazine.jpg"
          alt="hero"
        />
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "18px",
    "& p": {
      fontSize: "18px",
      margin: 0,
      [theme.breakpoints.down("sm")]: {
        textAlign: "center",
      },
    },
  },
  heroMessage: {
    fontSize: "36px",
    fontWeight: 700,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "32px",
      fontSize: "24px",
      textAlign: "center",
      wordBreak: "initial",
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
  smHidden: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export default Hero;
