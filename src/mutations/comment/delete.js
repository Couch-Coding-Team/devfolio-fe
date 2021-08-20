import gql from "graphql-tag";

const DELETE_COMMENT = gql`
  mutation Comment($id: ID!) {
    deleteComment(input: { where: { id: $id } }) {
      comment {
        id
      }
    }
  }
`;

export default DELETE_COMMENT;
