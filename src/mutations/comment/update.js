import gql from "graphql-tag";

const COMMENT_MUTATION = gql`
  mutation Comment($id: ID!, $comment: String) {
    updateComment(input: { where: { id: $id }, data: { comment: $comment } }) {
      comment {
        id
        comment
      }
    }
  }
`;

export default COMMENT_MUTATION;
