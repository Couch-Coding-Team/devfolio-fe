import gql from "graphql-tag";

const DELETE_REACTION = gql`
  mutation Reaction($id: ID!) {
    deleteReaction(input: { where: { id: $id } }) {
      reaction {
        id
      }
    }
  }
`;

export default DELETE_REACTION;
