import React, { Component } from "react";
import { Button, Modal } from "antd";
import { Mutation } from "react-apollo";
import { ADD_USER } from "../../common/gql";

class MutateButton extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms)).then(() =>
      console.log("Sleep done")
    );
  };

  handleError = e => {
    const { onError } = this.props;
    this.setState({ loading: false });
    onError(e);
  };

  handleResponse = data => {
    const { onComplete } = this.props;
    this.setState({ loading: false });
    onComplete(data);
  };

  render() {
    const { name } = this.props;
    const { loading } = this.state;

    return (
      <Mutation
        mutation={ADD_USER}
        onError={this.handleError}
        onCompleted={this.handleResponse}
      >
        {fireMutation => {
          return (
            <Button
              loading={loading}
              onClick={() => {
                fireMutation({ variables: { name } });
                this.setState({ loading: true });
              }}
            >
              Fire Mutation
            </Button>
          );
        }}
      </Mutation>
    );
  }
}

export default MutateButton;
