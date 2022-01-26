import * as React from "react";
import { graphql, StaticQuery } from "gatsby";
import Layout from "../components/Layout";
import Project from "../containers/Projects/components/Project";

const IndexPage = () => (
  <StaticQuery
    query={graphql`
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
    `}
    render={(data) => (
      <main>
        <Layout>
          <h1>{data.site.siteMetadata.title}</h1>
          <p>{data.site.siteMetadata.description}</p>
          {data.allStrapiProject.edges.map((edge, idx) => (
            <Project key={idx} project={edge.node} />
          ))}
        </Layout>
      </main>
    )}
  />
);

export default IndexPage;
