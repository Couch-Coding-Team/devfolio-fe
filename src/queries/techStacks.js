import gql from "graphql-tag";

const TECH_STACKS_QUERY = gql`
  query ($start: Int, $limit: Int, $sort: String, $where: JSON) {
    techStacksConnection(where: $where) {
      aggregate {
        count
      }
    }
    techStacks(start: $start, limit: $limit, sort: $sort, where: $where) {
      id
      name
      projects {
        id
      }
    }
  }
`;

export default TECH_STACKS_QUERY;
