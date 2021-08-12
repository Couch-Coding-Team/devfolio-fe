import React from "react";
import { useParams } from "react-router";

import moment from "moment";
import { Button, Chip, Container, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import GitHubIcon from "@material-ui/icons/GitHub";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import format from "rehype-format";

import { useMutation } from "@apollo/react-hooks";
import PROJECT_QUERY from "../../queries/project";
import PROJECT_MUTATION from "../../mutations/project";
import CREATE_REACTION from "../../mutations/reaction";
import DELETE_REACTION from "../../mutations/delete";

import Query from "../../components/Query";
import IconLabel from "../../components/IconLabel";
import PageNotFound from "../../components/PageNotFound";

const Project = () => {
  const userId = 1; // 진짜 userId로 대체
  const { id } = useParams();
  const classes = useStyles();
  const [updateProject, { error }] = useMutation(PROJECT_MUTATION);
  const [createReaction] = useMutation(CREATE_REACTION);
  const [deleteReaction] = useMutation(DELETE_REACTION);

  const createLike = (projectId) => {
    createReaction({
      variables: {
        input: { data: { project_id: projectId, user_id: userId } },
      },
    });
  };

  const deleteLike = (likeId) => {
    deleteReaction({
      variables: {
        id: likeId,
      },
    });
  };

  if (error)
    return <Alert severity="error">예기치 못한 에러가 발생했습니다.</Alert>;

  return (
    <Query
      query={PROJECT_QUERY}
      slug={id}
      onCompleted={({ projects }) => {
        if (projects.length) {
          updateProject({
            variables: { id, count: projects[0].view_count + 1 },
          });
        }
      }}
    >
      {({ data: { projects } }) => {
        if (!projects.length) return <PageNotFound />;
        const project = projects[0];
        const liked = project.reactions.find(
          (reaction) => reaction.user_id[0].id === userId.toString()
        );
        return (
          <Container
            maxWidth="sm"
            className={classes.root}
            style={{ position: "relative" }}
          >
            <IconLabel
              label={project.reactions.length}
              icon={
                !!liked ? (
                  <FavoriteIcon onClick={() => deleteLike(liked.id)} />
                ) : (
                  <FavoriteBorderIcon onClick={() => createLike(project.id)} />
                )
              }
              style={{ position: "fixed", top: 100, right: 100 }}
            />
            <h1>{project.title}</h1>
            {project.tech_stacks.map((stack) => (
              <Chip key={stack.name} label={stack.name} color="primary" />
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
