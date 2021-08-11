import gql from "graphql-tag";

const CREATE_REACTION = gql`
  mutation Reaction($input: createReactionInput) {
    createReaction(input: $input) {
      reaction {
        id
      }
    }
  }
`;

export default CREATE_REACTION;
