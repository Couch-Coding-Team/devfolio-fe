import { Container, makeStyles, Typography } from "@material-ui/core";
import { useParams } from "react-router";
import Query from "../../components/Query";
import ARTICLES_QUERY from "../../queries/articles";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import format from "rehype-format";

const ArticlePage = () => {
  const { id: articleId } = useParams();
  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.root}>
      <Query query={ARTICLES_QUERY} where={{ id: articleId }}>
        {({ data: { articles } }) => {
          const article = articles[0];
          return (
            <>
              <Typography variant="h4" gutterBottom>
                <strong>{article.title}</strong>
              </Typography>
              <img
                src={article.thumbnail_url}
                alt={article.thumbnail_url}
                style={{ width: "100%", objectFit: "cover", marginTop: "12px" }}
              />
              <ReactMarkdown
                remarkPlugins={[gfm]} // styling table, strikethrough, link, checkbox
                rehypePlugins={[rehypeRaw, format]}
                linkTarget="_blank"
                children={article.body_markdown}
                components={{
                  h2: ({ props, children }) => <h1 {...props}>{children}</h1>,
                  p: ({ props, children }) => (
                    <p style={{ lineHeight: 1.6 }} {...props}>
                      {children}
                    </p>
                  ),
                  img: ({ node, ...props }) => (
                    <img style={{ maxWidth: "100%" }} {...props} /> // Resizing images inside README to fit container
                  ),
                }}
              />
            </>
          );
        }}
      </Query>
    </Container>
  );
};

export default ArticlePage;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "32px",
    "& blockquote": {
      margin: "2rem 0px",
      borderLeft: `4px solid ${theme.palette.secondary.main}`,
      borderTopRightRadius: "4px",
      borderBottomRightRadius: "4px",
      background: "rgb(248, 249, 250)",
      padding: "1rem 1rem 1rem 2rem",
      color: "rgb(33, 37, 41)",
    },
  },
}));
