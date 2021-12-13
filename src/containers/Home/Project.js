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
import GitHubIcon from "@material-ui/icons/GitHub";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import IconLabel from "../../components/IconLabel";

const Project = ({ project }) => {
  const classes = useStyles();
  return (
    <Link
      to={`/project/${project.id}`}
      onClick={() => {
        window.gtag("event", "프로젝트 클릭", { project_id: project.id });
        sessionStorage.setItem("scrollTo", window.pageYOffset);
      }}
    >
      <Card className={classes.card}>
        <CardMedia>
          <img
            src={project.thumbnail_url}
            alt={project.thumbnail_url}
            width="100%"
            height="100%"
          />
        </CardMedia>
        <CardContent>
          <div>
            <Typography variant="subtitle1">
              <strong>{project.title}</strong>
            </Typography>
            <p>
              {project.description.length > 80
                ? project.description.substring(0, 80) + "..."
                : project.description}
            </p>
            <div>
              {project.tech_stacks.slice(0, 3).map((stack, index) => (
                <Chip
                  key={index}
                  label={stack.name}
                  color="primary"
                  size="small"
                />
              ))}
              {project.tech_stacks.length > 3 &&
                ` + ${project.tech_stacks.length - 3}`}
            </div>
          </div>
          <div className={classes.cardFooter}>
            <IconLabel
              icon={<GitHubIcon fontSize="small" />}
              label={project.owner_name}
            />
            <div className={classes.cardStats}>
              <IconLabel
                icon={<FavoriteIcon fontSize="small" />}
                label={project.reactions.length}
              />
              <IconLabel
                icon={<VisibilityIcon fontSize="small" />}
                label={project.view_count}
              />
              {!!project.comments.length && (
                <IconLabel
                  icon={<ChatBubbleIcon fontSize="small" />}
                  label={project.comments.length}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    height: "430px",
    marginBottom: "36px",
    display: "flex",
    borderRadius: "10px",
    boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.05)",
    flexDirection: "column",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
      padding: "24px",
      gap: "24px",
    },
    "& .MuiCardMedia-root": {
      flex: "1 1 100%",
      overflow: "hidden",
      "& img": {
        objectFit: "cover",
      },
    },
    "& .MuiCardContent-root": {
      flex: "1 0 60%",
      display: "flex",
      gap: "8px",
      padding: "18px",
      flexDirection: "column",
      justifyContent: "space-between",
      [theme.breakpoints.down("sm")]: {
        padding: 0,
      },
      "& .MuiTypography-h4": {
        [theme.breakpoints.down("sm")]: {
          marginBottom: "12px",
          padding: "18px",
        },
      },
    },
    "& .MuiChip-root": {
      margin: "auto 4px 4px auto",
    },
    "& p": {
      margin: "12px 0",
      fontSize: "14px",
    },
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      marginTop: "24px",
    },
  },
  cardStats: {
    display: "flex",
    gap: "1rem",
  },
}));

export default Project;
