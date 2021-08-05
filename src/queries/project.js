import gql from "graphql-tag";

const PROJECT_QUERY = gql`
  query Project($slug: String) {
    projects(where: { id: $slug }) {
      id
      title
      tech_stacks {
        name
      }
      owner_name
      owner_github_url
      project_github_url
      demo_site_url
      thumbnail_url
      readme_code
      published_at
    }
  }
`;

export default PROJECT_QUERY;
