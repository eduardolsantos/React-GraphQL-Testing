import React from "react";
import { mount } from "enzyme";
import MutateButton from "./index";
import { MockedProvider } from "react-apollo/test-utils";
import { ADD_USER_MOCK } from "../../common/mocks";

describe("<MutateButton />", () => {
  describe("On rendering", () => {
    it("Button should render", () => {
      const wrapper = mount(
        <MockedProvider mocks={ADD_USER_MOCK} addTypename={false}>
          <MutateButton />
        </MockedProvider>
      );

      expect(wrapper.find("MutateButton").length).toBe(1);
      // expect(wrapper).toMatchSnapshot();
    });
  });

  describe("When user clicks button", () => {
    it("Should call onError if an error occur", async () => {
      let called = false;
      const callback = () => (called = true);
      const wrapper = mount(
        <MockedProvider mocks={ADD_USER_MOCK} addTypename={false}>
          <MutateButton name="INVALID_NAME" onError={callback} />
        </MockedProvider>
      );

      wrapper.find("MutateButton").simulate("click");
      await new Promise(resolve => setTimeout(resolve));
      expect(called).toBe(true);
    });

    it("Should call onComplete when the mutation is completed successfully", async () => {
      let response = undefined;
      const callback = data => (response = data);
      const wrapper = mount(
        <MockedProvider mocks={ADD_USER_MOCK} addTypename={false}>
          <MutateButton name="Mary" onComplete={callback} />
        </MockedProvider>
      );

      wrapper.find("MutateButton").simulate("click");
      await new Promise(resolve => setTimeout(resolve));
      expect(response).toBeDefined();
    });
  });
});
