import gql from "graphql-tag";

const PROJECT_QUERY = gql`
  query Project($slug: String) {
    projects(where: { id: $slug }) {
      id
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
        user_id {
          id
        }
      }
      comments {
        id
        comment
        updated_at
        users_permissions_user {
          id
          username
          avatar_url
        }
      }
    }
  }
`;

export default PROJECT_QUERY;
