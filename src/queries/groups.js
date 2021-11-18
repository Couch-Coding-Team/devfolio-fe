import gql from "graphql-tag";

const GROUPS_QUERY = gql`
  query Groups($offset: Int, $limit: Int) {
    groups(offset: $offset, limit: $limit, sort: "created_at:desc") {
      id
      title
      is_open
    }
  }
`;

export default GROUPS_QUERY;
