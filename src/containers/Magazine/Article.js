import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
} from "@material-ui/core";

const Article = ({ article }) => {
  const classes = useStyles();
  return (
    // <Link
    //   to={`/article/${article.id}`}
    //   onClick={() => {
    //     window.gtag("event", "프로젝트 클릭", { article_id: article.id });
    //     sessionStorage.setItem("scrollTo", window.pageYOffset);
    //   }}
    // >
    <Card className={classes.card}>
      <CardMedia>
        <img
          src="https://devfolio.kr/assets/hero.jpg"
          // src={article.thumbnail_url}
          // alt={article.thumbnail_url}
          width="100%"
          height="100%"
        />
      </CardMedia>
      <CardContent>
        <div>
          <Typography variant="subtitle1">
            <strong>{article.title}</strong>
          </Typography>
          {/* <p>
            {article.description.length > 80
              ? article.description.substring(0, 80) + "..."
              : article.description}
          </p> */}
        </div>
      </CardContent>
    </Card>
    // </Link>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    height: "430px",
    padding: "48px",
    marginBottom: "36px",
    display: "flex",
    gap: "72px",
    borderRadius: "10px",
    boxShadow: "15px 15px 30px rgba(0, 0, 0, 0.1)",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      padding: "18px",
      flexDirection: "column",
      gap: "24px",
    },
    "& .MuiCardMedia-root": {
      flex: "0 0 50%",
      "& img": {
        objectFit: "cover",
      },
      [theme.breakpoints.down("sm")]: {
        height: "50%",
      },
    },
    "& .MuiCardContent-root": {
      flex: "1 1 100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: 0,
      "& .MuiTypography-h4": {
        [theme.breakpoints.down("sm")]: {
          marginBottom: "12px",
        },
      },
    },
    "& .MuiChip-root": {
      margin: "auto 4px 4px auto",
    },
    "& p": {
      margin: "24px 0",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  },
}));

export default Article;
