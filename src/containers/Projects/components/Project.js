import React from "react";
import { Link } from "gatsby";
import { Card, CardContent, CardMedia, Typography, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
// import IconLabel from "../../../components/IconLabel";

const Project = ({ project }) => {
  return (
    <Root>
      <Link
        to={`/project/${project.strapiId}`}
        onClick={() => {
          window.gtag("event", "프로젝트 클릭", {
            project_id: project.strapiId,
          });
          sessionStorage.setItem("scrollTo", window.pageYOffset);
        }}
      >
        <Card className="card">
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
              <p>{project.description}</p>
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
            {/* <div className='cardFooter'>
          <IconLabel
            icon={<GitHubIcon fontSize="small" />}
            label={project.owner_name}
          />
          <div className='cardStats'>
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
        </div> */}
          </CardContent>
        </Card>
      </Link>
    </Root>
  );
};

const Root = styled("div")((theme) => ({
  "&.card": {
    height: "400px",
    marginBottom: "36px",
    marginRight: "36px",
    display: "flex",
    borderRadius: "10px",
    boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.05)",
    flexDirection: "column",
    // [theme.breakpoints.down("md")]: {
    //   height: "100%",
    //   padding: "24px",
    //   gap: "24px",
    //   marginRight: 0,
    // },
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
      // [theme.breakpoints.down("md")]: {
      //   padding: 0,
      // },
      "& .MuiTypography-h4": {
        // [theme.breakpoints.down("md")]: {
        //   marginBottom: "12px",
        //   padding: "18px",
        // },
      },
    },
    "& .MuiChip-root": {
      margin: "auto 4px 4px auto",
      fontFamily: "Montserrat",
    },
    "& h6": {
      lineHeight: "1.5rem",
    },
    "& p": {
      margin: "12px 0",
      fontSize: "14px",
      display: "-webkit-box",
      "-webkit-line-clamp": 2,
      "-webkit-box-orient": "vertical",
      overflow: "hidden",
    },
  },
  "&.cardFooter": {
    display: "flex",
    justifyContent: "space-between",
    // [theme.breakpoints.down("md")]: {
    //   marginTop: "24px",
    // },
  },
  "&.cardStats": {
    display: "flex",
    gap: "1rem",
  },
}));

export default Project;
