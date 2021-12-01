import React from "react";
import { makeStyles, Grid } from "@material-ui/core";

const Hero = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6} className={classes.heroMain}>
        <p>토이 프로젝트와 DevFoliOh의 비하인드 스토리</p>
        <div className={classes.heroMessage}>
          DevFoliOh 매거진에서 확인해보세요
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
    gap: "24px",
    "& p": {
      fontSize: "24px",
      margin: 0,
      [theme.breakpoints.down("sm")]: {
        marginTop: "40px",
        textAlign: "center",
      },
    },
  },
  heroMessage: {
    fontSize: "48px",
    fontWeight: 700,
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
