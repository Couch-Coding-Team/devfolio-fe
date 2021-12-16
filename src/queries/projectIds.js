import gql from "graphql-tag";

const PROJECT_IDS_QUERY = gql`
  query Projects($start: Int, $limit: Int, $sort: String, $where: JSON) {
    projectsConnection(where: $where) {
      aggregate {
        count
      }
    }
    projects(start: $start, limit: $limit, sort: $sort, where: $where) {
      id
    }
  }
`;

export default PROJECT_IDS_QUERY;
