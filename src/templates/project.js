import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import React, { useContext, useEffect } from "react";
import {
  Button,
  Chip,
  Container,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import moment from "moment";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import format from "rehype-format";

const LIKE_ICON_STYLE = {
  border: "1px solid #9D9D9D",
  borderRadius: "100px",
  padding: "4px",
  cursor: "pointer",
};
const ProjectTemplate = ({ location, data }) => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("md"), {
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

  // const handleLikeClick = (liked) => {
  //   if (!userId) return;
  //   if (liked) {
  //     deleteLike(liked.id);
  //   } else {
  //     createLike(projectId);
  //   }
  // };

  if (!data) return <p>Loading ...</p>;

  const { strapiProject: project } = data;
  const liked = false;
  // const liked = project.reactions.find(
  //   (reaction) => reaction.user_id[0].id === userId?.toString()
  //   );

  const techStackNames = project.tech_stacks.map((el) => el.name);

  return (
    <Root>
      <Layout location={location}>
        <Container maxWidth="sm" className="root">
          <h1>{project.title}</h1>
          {project.tech_stacks.map((stack) => (
            <Chip key={stack.name} label={stack.name} color="primary" />
          ))}
          <div className="details">
            <div className="stats">
              <div className="author">
                <a
                  href={project.owner_github_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {/* <IconLabel icon={<GitHubIcon />} label={project.owner_name} /> */}
                </a>
                <span className="date">
                  {moment(project.published_at).format("MMM Do YYYY")}
                </span>
              </div>
              {/* 
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
          /> */}
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
                      project_id: project.strapiId,
                    })
                  }
                  className="button"
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
                    project_id: project.strapiId,
                  })
                }
                className="button"
              >
                GitHub 소스 보러가기
              </Button>
            </div>
          </div>
          {project.reference_url && (
            <div className="textBlock">
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
          {/* <Comments
          data={project.comments}
          submitData={createComment}
          deleteComment={deleteComment}
          updateComment={updateComment}
        /> */}
        </Container>
      </Layout>
    </Root>
  );
};

const Root = styled("div")(({ theme }) => ({
  "&.root": {
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
  "&.imgWrapper": {
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
  "&.details": {
    display: "flex",
    justifyContent: "space-between",
    margin: "72px auto",
    [theme.breakpoints.down("md")]: {
      margin: "28px auto",
      flexDirection: "column",
      gap: "28px",
    },
  },
  "&.stats": {
    display: "flex",
    justifyContent: "space-between",
  },
  "&.author": {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    flexWrap: "wrap",
  },
  "&.date": {
    height: "1.3em",
  },
  "&.button": {
    margin: "4px",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginBottom: "12px",
    },
  },
  "&.textBlock": {
    backgroundColor: "#F7F7F7",
    padding: "24px 36px",
    margin: "48px 0",
  },
}));

export default ProjectTemplate;

export const query = graphql`
  query ProjectTemplate($id: Int!) {
    strapiProject(strapiId: { eq: $id }) {
      strapiId
      title
      description
      tech_stacks {
        name
      }
      owner_name
      owner_github_url
      project_github_url
      reference_url
      demo_site_url
      thumbnail_url
      readme_code
      published_at
      view_count
      reactions {
        id
      }
      comments {
        id
        comment
        updated_at
      }
    }
  }
`;
