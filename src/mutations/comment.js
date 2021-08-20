import gql from "graphql-tag";

const CREATE_COMMENT = gql`
  mutation Comment($input: createCommentInput) {
    createComment(input: $input) {
      comment {
        id
        comment
      }
    }
  }
`;

export default CREATE_COMMENT;
