import gql from "graphql-tag";

const PROJECT_MUTATION = gql`
  mutation Project($id: ID!, $count: Int) {
    updateProject(input: { where: { id: $id }, data: { view_count: $count } }) {
      project {
        id
        title
        view_count
      }
    }
  }
`;

export default PROJECT_MUTATION;
