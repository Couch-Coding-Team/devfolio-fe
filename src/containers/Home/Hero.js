import React from "react";
import { makeStyles, Button, Grid } from "@material-ui/core";

const Hero = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={6} className={classes.heroMain}>
        <p>다른 개발자들은 어떤 프로젝트를 만들었을까?</p>
        <img className={classes.logo} src="assets/logo.png" alt="logo" />
        <div className={classes.heroMessage}>
          개발자 토이프로젝트 모아보기 서비스
        </div>
        <p className={classes.heroDescription}>
          선배・동료 개발자들의 토이프로젝트를 한눈에 모아보고, 좋은 프로젝트는
          더 많은 사람들과 공유해보세요.
        </p>
        <Button
          color="primary"
          variant="contained"
          href="https://page.stibee.com/subscriptions/129317"
          target="_blank"
          onClick={() => window.gtag("event", "새 포트폴리오 알림받기 클릭")}
          className={classes.button}
        >
          뉴스레터 구독하기
        </Button>
        <Button
          color="secondary"
          variant="contained"
          href="https://docs.google.com/forms/d/e/1FAIpQLSdXQaXRohcJHLI1rh4lNQsCPGTMMplppgg7bCGS6WOlxVCi2Q/viewform"
          target="_blank"
          onClick={() => window.gtag("event", "프로젝트 공유 클릭")}
          className={classes.button}
        >
          프로젝트 공유하기
        </Button>
      </Grid>
      <Grid item xs={12} md={6} className={classes.smHidden}>
        <img className={classes.heroImage} src="assets/hero.jpg" alt="hero" />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  logo: {
    width: "80%",
    margin: "40px auto 20px auto",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      margin: "40px auto 20px auto",
      maxWidth: "350px",
    },
  },
  heroMain: {
    "& p": {
      fontSize: "18px",
      margin: 0,
    },
  },
  heroMessage: {
    fontSize: "24px",
    marginBottom: "40px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: 10,
    },
  },
  heroImage: {
    width: "100%",
  },
  button: {
    margin: "36px 12px 12px 0",
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
  heroDescription: {
    [theme.breakpoints.down("sm")]: {
      color: "#999999",
    },
  },
}));

export default Hero;
