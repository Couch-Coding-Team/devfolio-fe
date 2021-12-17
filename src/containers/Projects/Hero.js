import React from "react";
import { makeStyles, Button, Grid } from "@material-ui/core";
import logo from "../../assets/logo.png";
import hero from "../../assets/hero.jpg";

const Hero = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12} md={6} className={classes.heroMain}>
        <p>다른 개발자들은 어떤 프로젝트를 만들었을까?</p>
        <img className={classes.logo} src={logo} alt="logo" />
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
      <Grid item xs={12} md={6} className={classes.heroImageContainer}>
        <img className={classes.heroImage} src={hero} alt="hero_image" />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: "300px",
    margin: "20px auto",
  },
  heroMain: {
    "& p": {
      fontSize: "18px",
      margin: 0,
    },
  },
  heroMessage: {
    fontSize: "24px",
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "10px",
    },
  },
  heroImage: {
    width: "75%",
    maxHeight: "400px",
    objectFit: "contain",
  },
  heroImageContainer: {
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  button: {
    margin: "36px 12px 12px 0",
  },
  heroDescription: {
    [theme.breakpoints.down("sm")]: {
      color: "#999999",
    },
  },
}));

export default Hero;
