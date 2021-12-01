import gql from "graphql-tag";

const ARTICLES_QUERY = gql`
  query Articles {
    articles {
      id
      title
      description
      released_at
      published_at
      thumbnail_url
    }
  }
`;

export default ARTICLES_QUERY;
