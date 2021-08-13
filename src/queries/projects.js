import gql from "graphql-tag";

const PROJECTS_QUERY = gql`
  query Projects {
    projects(sort: "published_at:desc") {
      id
      title
      description
      owner_name
      owner_github_url
      project_github_url
      title
      description
      tech_stacks {
        name
      }
      thumbnail_url
      view_count
      published_at
      reactions {
        id
      }
    }
  }
`;

export default PROJECTS_QUERY;
