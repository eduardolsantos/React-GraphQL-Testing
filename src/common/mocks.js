import { ADD_USER, ADD_USER_FRAG } from "./gql";

export const ADD_USER_MOCK = [
  {
    request: { query: ADD_USER, variables: { name: "INVALID_NAME" } },
    error: new Error("This name is not valid")
  },
  {
    request: { query: ADD_USER, variables: { name: "John" } },
    result: {
      data: {
        addUser: { id: "1", name: "John", __typename: "AddUserResponse" }
      }
    }
  },
  {
    request: { query: ADD_USER, variables: { name: "Mary" } },
    result: {
      data: {
        addUser: { id: "2", name: "Mary", __typename: "AddUserResponse" }
      }
    }
  },
  {
    request: { query: ADD_USER, variables: { name: "Chris" } },
    result: {
      data: {
        addUser: { id: "3", name: "Chris", __typename: "AddUserResponse" }
      }
    }
  }
];

export const ADD_USER_FRAG_MOCK = [
  {
    request: {
      query: ADD_USER_FRAG,
      variables: {
        name: "Jim",
        description: "From The Office",
        hasDescription: true
      }
    },
    result: {
      data: {
        addWithDescription: {
          uuid: "4",
          name: "Jim",
          description: "From The Office",
          __typename: "AddUserResponse"
        },
        __typename: "Mutation"
      }
    }
  },
  {
    request: {
      query: ADD_USER_FRAG,
      variables: {
        name: "Dwight",
        description: "MICHAEL!",
        hasDescription: true
      }
    },
    result: {
      data: {
        addWithDescription: {
          uuid: "5",
          name: "Dwight",
          description: "MICHAEL!",
          __typename: "AddUserResponse"
        },
        __typename: "Mutation"
      }
    }
  },
  {
    request: {
      query: ADD_USER_FRAG,
      variables: { name: "Pam", description: "", hasDescription: false }
    },
    result: {
      data: {
        addWithoutDescription: {
          uuid: "6",
          name: "Pam",
          description: "",
          __typename: "AddUserResponse"
        },
        __typename: "Mutation"
      }
    }
  }
];
