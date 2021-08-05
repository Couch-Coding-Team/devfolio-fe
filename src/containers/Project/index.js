import React from "react";
import { useParams } from "react-router";
import moment from "moment";
import { Button, Container, makeStyles } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";

import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import format from "rehype-format";

import PROJECT_QUERY from "../../queries/project";
import Query from "../../components/Query";
import Tag from "../../components/Tag";
import IconLabel from "../../components/IconLabel";
import PageNotFound from "../../components/PageNotFound";

const Project = () => {
  const { id } = useParams();
  const classes = useStyles();

  return (
    <Query query={PROJECT_QUERY} slug={id}>
      {({ data: { projects } }) => {
        if (!projects.length) return <PageNotFound />;
        const project = projects[0];

        return (
          <Container maxWidth="sm" className={classes.root}>
            <h1>{project.title}</h1>
            {project.tech_stacks.map((stack) => (
              <Tag key={stack.name} label={stack.name} />
            ))}
            <div className={classes.details}>
              <div className={classes.detailsLeft}>
                <a
                  href={project.owner_github_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <IconLabel icon={<GitHubIcon />} label={project.owner_name} />
                </a>
                <span className={classes.date}>
                  {moment(project.published_at).format("MMM Do YYYY")}
                </span>
              </div>
              <div>
                {project.demo_site_url && (
                  <Button
                    color="primary"
                    variant="contained"
                    href={project.demo_site_url}
                    target="_blank"
                    onClick={() =>
                      window.gtag("event", "데모사이트 보러가기 클릭", {
                        project_id: project.id,
                      })
                    }
                    className={classes.button}
                  >
                    데모사이트 보러가기
                  </Button>
                )}
                <Button
                  color="secondary"
                  variant="contained"
                  href={project.project_github_url}
                  target="_blank"
                  onClick={() =>
                    window.gtag("event", "소스 보러가기 클릭", {
                      project_id: project.id,
                    })
                  }
                  className={classes.button}
                >
                  GitHub 소스 보러가기
                </Button>
              </div>
            </div>
            <ReactMarkdown
              className="readme-markdown"
              remarkPlugins={[gfm]} // styling table, strikethrough, link, checkbox
              rehypePlugins={[rehypeRaw, format]}
              linkTarget="_blank"
              children={project.readme_code}
              components={{
                img: ({ node, ...props }) => (
                  <img style={{ maxWidth: "100%" }} {...props} /> // Resizing images inside README to fit container
                ),
              }}
            />
          </Container>
        );
      }}
    </Query>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiChip-root": {
      marginRight: "8px",
      marginBottom: "8px",
    },
    "& .readme-markdown": {
      fontFamily: "Arial",
      "& a": {
        color: "-webkit-link",
        textDecoration: "underline",
      },
      "& blockquote": {
        background: "#f9f9f9",
        borderLeft: "10px solid #ccc",
        margin: "1.5em 10px",
        padding: "0.5em 10px",
      },
      "& pre": {
        fontFamily: "monospace",
        whiteSpace: "pre",
        backgroundColor: "#1B1F230D",
        padding: "12px",
        overflowX: "auto",
      },
      // "& pre code": {
      //   whiteSpace: "inherit",
      // },
      "& code": {
        // color: " #f8f8f2",
        // backgroundColor: "#1B1F230D",
      },
      "& table": {
        borderCollapse: "collapse",
        "& th": {
          border: "1px solid lightgrey",
          padding: "6px 13px",
        },
        "& td": {
          border: "1px solid lightgrey",
          padding: "6px 13px",
        },
      },
    },
  },
  imgWrapper: {
    height: 0,
    position: "relative",
    paddingBottom: "52.63%" /* 이미지 비율 1900:1000 */,
    marginBottom: "104px",
    "& img": {
      height: "100%",
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      objectFit: "contain",
    },
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "72px auto",
    [theme.breakpoints.down("sm")]: {
      margin: "28px auto",
      flexDirection: "column",
      gap: "28px",
    },
  },
  detailsLeft: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  date: {
    height: "1.3em",
  },
  button: {
    marginRight: "24px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "12px",
    },
  },
}));

export default Project;
