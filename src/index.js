import React from "react";
import ReactDOM from "react-dom";
import { version, Modal } from "antd";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MockedProvider } from "react-apollo/test-utils";
import { ADD_USER_MOCK } from "./common/mocks";
import "antd/dist/antd.css";
import "./index.css";

import MutateButton from "./components/mutateButton/index";

Enzyme.configure({ adapter: new Adapter() });

class App extends React.Component {
  handleError = e => {
    Modal.error({
      title: "An unexpected error occurred",
      content: e.message
    });
  };

  handleResponse = ({ addUser: response }) => {
    console.log(response);
    Modal.success({
      title: "Success",
      content: `Mutation successfully executed for user: ${response.name}`
    });
  };

  render() {
    return (
      <MockedProvider mocks={ADD_USER_MOCK} addTypename={false}>
        <div className="App">
          <MutateButton
            name="John"
            onError={this.handleError}
            onComplete={this.handleResponse}
          />
        </div>
      </MockedProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
