import gql from "graphql-tag";

const TECH_STACKS_QUERY = gql`
  query {
    techStacks {
      id
      name
      projects {
        id
      }
    }
  }
`;

export default TECH_STACKS_QUERY;
