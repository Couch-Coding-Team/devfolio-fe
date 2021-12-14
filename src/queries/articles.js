import gql from "graphql-tag";

const ARTICLES_QUERY = gql`
  query Articles($where: JSON) {
    articlesConnection(where: $where) {
      aggregate {
        count
      }
    }
    articles(where: $where) {
      id
      title
      description
      released_at
      published_at
      thumbnail_url
      body_markdown
    }
  }
`;

export default ARTICLES_QUERY;
