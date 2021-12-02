import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Typography,
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
          <Typography color="textSecondary" variant="subtitle2">
            <strong>
              {moment(article.released_at || article.published_at).format(
                "YYYY.MM.DD"
              )}
            </strong>
          </Typography>
          <Typography variant="h6">
            <strong>{article.title}</strong>
          </Typography>
          <p>{article.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    height: "222px",
    padding: "32px",
    margin: "36px",
    display: "flex",
    gap: "36px",
    borderRadius: "10px",
    boxShadow: "15px 15px 30px rgba(0, 0, 0, 0.1)",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      padding: "18px",
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
      gap: "14px",
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
      margin: "0",
      display: "-webkit-box",
      "-webkit-line-clamp": 2,
      "-webkit-box-orient": "vertical",
      overflow: "hidden",
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  },
}));

export default ArticleCard;
