import React, { useContext } from "react";
import { useParams } from "react-router";
import { useMutation } from "@apollo/react-hooks";

import {
  Button,
  Chip,
  Container,
  Link,
  makeStyles,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import GitHubIcon from "@material-ui/icons/GitHub";
import FavoriteIcon from "@material-ui/icons/Favorite";

import moment from "moment";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import format from "rehype-format";

import PROJECT_QUERY from "../../queries/project";
import PROJECT_MUTATION from "../../mutations/project";
import CREATE_REACTION from "../../mutations/createReaction";
import DELETE_REACTION from "../../mutations/deleteReaction";
import CREATE_COMMENT from "../../mutations/comment";
import DELETE_COMMENT from "../../mutations/comment/delete";
import UPDATE_COMMENT from "../../mutations/comment/update";

import { UserContext } from "../../AppContext";
import Query from "../../components/Query";
import IconLabel from "../../components/IconLabel";
import PageNotFound from "../../components/PageNotFound";
import Meta from "../../components/Meta";
import Comments from "./Comments";

const Project = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  const LIKE_BUTTON_STYLE = isSmScreen
    ? {
        position: "initial",
      }
    : {
        position: "fixed",
        top: 240,
        right: 270,
        flexDirection: "column",
      };

  const LIKE_ICON_STYLE = {
    border: "1px solid #9D9D9D",
    borderRadius: "100px",
    padding: "4px",
    cursor: "pointer",
  };

  const userId = useContext(UserContext)?.id;
  const { id: projectId } = useParams();

  // TODO: REFACTOR to redux actions
  const [updateProject, { error: projUpdateErr }] =
    useMutation(PROJECT_MUTATION);
  const [createReaction, { error: likeCreateErr }] = useMutation(
    CREATE_REACTION,
    {
      refetchQueries: [
        { query: PROJECT_QUERY, variables: { slug: projectId } },
      ],
    }
  );
  const [deleteReaction, { error: likeDeleteErr }] = useMutation(
    DELETE_REACTION,
    {
      refetchQueries: [
        { query: PROJECT_QUERY, variables: { slug: projectId } },
      ],
    }
  );
  const [createComment, { error: commCreateErr }] = useMutation(
    CREATE_COMMENT,
    {
      refetchQueries: [
        { query: PROJECT_QUERY, variables: { slug: projectId } },
      ],
    }
  );
  const [deleteComment, { error: commDeleteErr }] = useMutation(
    DELETE_COMMENT,
    {
      refetchQueries: [
        { query: PROJECT_QUERY, variables: { slug: projectId } },
      ],
    }
  );
  const [updateComment, { error: commUpdateErr }] = useMutation(
    UPDATE_COMMENT,
    {
      refetchQueries: [
        { query: PROJECT_QUERY, variables: { slug: projectId } },
      ],
    }
  );

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

  const handleLikeClick = (liked) => {
    if (!userId) return;
    if (liked) {
      deleteLike(liked.id);
    } else {
      createLike(projectId);
    }
  };

  return (
    <Query
      query={PROJECT_QUERY}
      slug={projectId}
      onCompleted={({ projects }) => {
        if (projects.length) {
          updateProject({
            variables: { id: projectId, count: projects[0].view_count + 1 },
          });
        }
      }}
    >
      {({ data: { projects } }) => {
        if (!projects.length) return <PageNotFound />;
        const project = projects[0];

        const liked = project.reactions.find(
          (reaction) => reaction.user_id[0].id === userId?.toString()
        );

        const techStackNames = project.tech_stacks.map((el) => el.name);
        const metaDescription = `${techStackNames.join(
          "･"
        )}(으)로 만든 프로젝트 | ${project.title} | ${project.description}`;
        const metaKeywords = techStackNames.join(",");

        return (
          <Container maxWidth="sm" className={classes.root}>
            <Meta
              title={project.title}
              description={metaDescription}
              image={project.thumbnail_url}
              canonical={`https://devfolio.kr/project/${projectId}`}
              keywords={metaKeywords}
            />
            {(projUpdateErr ||
              likeCreateErr ||
              likeDeleteErr ||
              commCreateErr ||
              commDeleteErr ||
              commUpdateErr) && (
              <Alert severity="error">예기치 못한 에러가 발생했습니다.</Alert>
            )}
            <h1>{project.title}</h1>
            {project.tech_stacks.map((stack) => (
              <Chip key={stack.name} label={stack.name} color="primary" />
            ))}
            <div className={classes.details}>
              <div className={classes.stats}>
                <div className={classes.author}>
                  <a
                    href={project.owner_github_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <IconLabel
                      icon={<GitHubIcon />}
                      label={project.owner_name}
                    />
                  </a>
                  <span className={classes.date}>
                    {moment(project.published_at).format("MMM Do YYYY")}
                  </span>
                </div>

                <IconLabel
                  style={LIKE_BUTTON_STYLE}
                  label={project.reactions.length}
                  icon={
                    <Tooltip arrow title="프로젝트 응원하기" placement="top">
                      <FavoriteIcon
                        color={!!liked ? "secondary" : "disabled"}
                        fontSize="large"
                        onClick={() => handleLikeClick(liked)}
                        style={LIKE_ICON_STYLE}
                      />
                    </Tooltip>
                  }
                />
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
                        project_id: projectId,
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
                      project_id: projectId,
                    })
                  }
                  className={classes.button}
                >
                  GitHub 소스 보러가기
                </Button>
              </div>
            </div>
            {project.reference_url && (
              <div className={classes.textBlock}>
                💡{" "}
                <Link href={project.reference_url} target="_blank">
                  프로젝트 개발자가 직접 작성한 후기 글 보러 가기
                </Link>
              </div>
            )}
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
            <Comments
              data={project.comments}
              submitData={createComment}
              deleteComment={deleteComment}
              updateComment={updateComment}
            />
          </Container>
        );
      }}
    </Query>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "32px",
    position: "relative",

    "& .MuiChip-root": {
      marginRight: "8px",
      marginBottom: "8px",
    },
    "& .readme-markdown": {
      fontFamily: "Arial",
      "& a": {
        color: "-webkit-link",
        textDecoration: "underline",
        cursor: "pointer",
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
  stats: {
    display: "flex",
    justifyContent: "space-between",
  },
  author: {
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
  textBlock: {
    backgroundColor: "#F7F7F7",
    padding: "24px 36px",
    margin: "48px 0",
  },
}));

export default Project;
