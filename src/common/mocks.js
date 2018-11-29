import { ADD_USER } from "./gql";

export const ADD_USER_MOCK = [
  {
    request: { query: ADD_USER, variables: { name: "INVALID_NAME" } },
    error: new Error("This name is not valid")
  },
  {
    request: { query: ADD_USER, variables: { name: "John" } },
    result: {
      data: { addUser: { id: "1", name: "John" } }
    }
  },
  {
    request: { query: ADD_USER, variables: { name: "Mary" } },
    result: {
      data: { addUser: { id: "2", name: "Mary" } }
    }
  },
  {
    request: { query: ADD_USER, variables: { name: "Chris" } },
    result: {
      data: { addUser: { id: "3", name: "Chris" } }
    }
  }
];
