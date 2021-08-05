import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
// import VisibilityIcon from "@material-ui/icons/Visibility";
import Tag from "../../components/Tag";
import IconLabel from "../../components/IconLabel";

const Project = ({ project }) => {
  const classes = useStyles();

  return (
    <Link
      to={`/project/${project.id}`}
      onClick={() =>
        window.gtag("event", "프로젝트 클릭", { project_id: project.id })
      }
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
            <Typography variant="h4">
              <strong>{project.title}</strong>
            </Typography>
            <p>
              {project.description.length > 150
                ? project.description.substring(0, 150) + "..."
                : project.description}
            </p>
            {project.tech_stacks.map((stack) => (
              <Tag key={stack.name} label={stack.name} />
            ))}
          </div>
          <div className={classes.cardFooter}>
            <IconLabel icon={<GitHubIcon />} label={project.owner_name} />
            {/* <IconLabel icon={<VisibilityIcon />} label="12" /> */}
          </div>
        </CardContent>
      </Card>
    </Link>
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
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      marginTop: "24px",
    },
  },
}));

export default Project;
