import React, { Component } from "react";
import { Button, Modal } from "antd";
import { Mutation } from "react-apollo";
import { ADD_USER_FRAG } from "../../common/gql";

class FragmentMutateButton extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

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
    const { name, description } = this.props;
    const { loading } = this.state;
    let hasDescription = false;

    if (description) {
      hasDescription = true;
    }

    return (
      <Mutation
        mutation={ADD_USER_FRAG}
        onError={this.handleError}
        onCompleted={this.handleResponse}
      >
        {fireMutation => {
          return (
            <Button
              loading={loading}
              onClick={() => {
                fireMutation({
                  variables: { name, description, hasDescription }
                });
                this.setState({ loading: true });
              }}
            >
              Fire Mutation Fragment
            </Button>
          );
        }}
      </Mutation>
    );
  }
}

export default FragmentMutateButton;
