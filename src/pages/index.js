import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Hero from "../containers/Projects/Hero";
import Layout from "../components/Layout";
import Project from "../containers/Projects/components/Project";

const IndexPage = (props) => {
  const data = useStaticQuery(query);
  return (
    <Layout location={props.location}>
      <Container>
        <Hero />
      </Container>
      <Root>
        <Container>
          <h1>{data.site.siteMetadata.title}</h1>
          <p>{data.site.siteMetadata.description}</p>
          {data.allStrapiProject.edges.map((edge, idx) => (
            <Project key={idx} project={edge.node} />
          ))}
        </Container>
      </Root>
    </Layout>
  );
};

const Root = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.grey[50], // #f9f9f9
  paddingBottom: "36px",
}));

const query = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allStrapiProject {
      edges {
        node {
          strapiId
          title
          description
          owner_name
          owner_github_url
          project_github_url
          tech_stacks {
            name
          }
          thumbnail_url
          view_count
          published_at
          reactions {
            id
          }
          comments {
            id
          }
        }
      }
    }
  }
`;
export default IndexPage;
