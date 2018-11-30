import React from "react";
import ReactDOM from "react-dom";
import { version, Modal } from "antd";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MockedProvider } from "react-apollo/test-utils";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ADD_USER_MOCK, ADD_USER_FRAG_MOCK } from "./common/mocks";
import "antd/dist/antd.css";
import "./index.css";

import MutateButton from "./components/mutateButton/index";
import FragmentMutateButton from "./components/fragmentMutateButton/index";

Enzyme.configure({ adapter: new Adapter() });

class App extends React.Component {
  handleError = e => {
    console.log(e.message);
    Modal.error({
      title: "An unexpected error occurred",
      content: e.message
    });
  };

  handleResponse = response => {
    console.log(response);
    Modal.success({
      title: "Success",
      content: `Mutation successfully executed.`
    });
  };

  render() {
    const myCache = new InMemoryCache({
      // This is necessary due to Fragment use and I'm turning off addTypename.
      // Doing that, we avoid the warning messages about fragments and the "heuristic fragment going on" error
      // For more info, refer to:
      // -> https://www.apollographql.com/docs/react/advanced/caching.html#normalization
      // -> https://stackoverflow.com/questions/45509228/why-do-graphql-fragments-need-typename-in-queries
      dataIdFromObject: object => {
        const { id, uuid } = object;
        return id ? id : uuid;
      }
    });

    return (
      <MockedProvider
        cache={myCache}
        mocks={[...ADD_USER_MOCK, ...ADD_USER_FRAG_MOCK]}
      >
        <div className="App">
          <MutateButton
            name="John"
            onError={this.handleError}
            onComplete={this.handleResponse}
          />
          <FragmentMutateButton
            name="Pam"
            description=""
            onError={this.handleError}
            onComplete={this.handleResponse}
          />
        </div>
      </MockedProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
