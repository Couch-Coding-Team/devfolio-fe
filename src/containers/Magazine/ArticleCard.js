import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Typography,
  colors,
} from "@material-ui/core";
import moment from "moment";

const ArticleCard = ({ article }) => {
  const classes = useStyles();
  return (
    <Link
      to={`/magazine/${article.id}`}
      onClick={() => {
        window.gtag("event", "매거진 클릭", { article_id: article.id });
        sessionStorage.setItem("scrollTo", window.pageYOffset);
      }}
    >
      <Card className={classes.card}>
        <CardMedia>
          <img
            src={article.thumbnail_url}
            alt={article.thumbnail_url}
            width="100%"
            height="100%"
          />
        </CardMedia>
        <CardContent>
          <Typography variant="subtitle1" className={classes.date}>
            {moment(article.released_at || article.published_at).format(
              "YYYY.MM.DD"
            )}
          </Typography>
          <Typography variant="h6">
            <strong>{article.title}</strong>
          </Typography>
          <Typography className={classes.description}>
            {article.description}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    height: "222px",
    padding: "24px",
    margin: "32px",
    display: "flex",
    gap: "36px",
    position: "relative",
    borderRadius: "10px",
    boxShadow: "15px 15px 30px rgba(0, 0, 0, 0.1)",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      flexDirection: "column",
      gap: "24px",
    },
    "& .MuiCardMedia-root": {
      flex: "0 0 25%",
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
      justifyContent: "center",
      padding: 0,
    },
  },
  date: {
    color: colors.grey[300],
    fontWeight: 700,
  },
  description: {
    color: colors.grey[600],
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

export default ArticleCard;
