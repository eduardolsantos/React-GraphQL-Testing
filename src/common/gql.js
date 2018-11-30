import gql from "graphql-tag";

export const ADD_USER = gql`
  mutation AddUser($name: String!) {
    addUser(name: $name) {
      id
      name
    }
  }
`;

export const ADD_USER_FRAG = gql`
  mutation AddUserFrag(
    $name: String!
    $hasDescription: Boolean!
    $description: String
  ) {
    ...AddWithDescription @include(if: $hasDescription)
    ...AddWithoutDescription @skip(if: $hasDescription)
  }

  fragment ResponseFields on AddUserResponse {
    uuid
    name
    description
  }

  fragment AddWithDescription on Mutation {
    addWithDescription: addUser(name: $name, description: $description) {
      ...ResponseFields
    }
  }

  fragment AddWithoutDescription on Mutation {
    addWithoutDescription: addUser(name: $name) {
      ...ResponseFields
    }
  }
`;
