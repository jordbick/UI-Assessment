import { expect } from "@jest/globals";
import { mount } from "enzyme";
import React from "react";
import { FeatureFlag, FeatureFlagProvider } from "../../components/FeatureFlag";
import { getFeatureFlag } from "../../components/FeatureFlag/FeatureFlag";

const EnabledComponent: React.FC = () => <div className="enabled">ON</div>;
const DisabledComponent: React.FC = () => <div className="disabled">OFF</div>;

describe("Feature Flag tests", () => {
  it("renders", () => {
    <FeatureFlagProvider>
      <FeatureFlag />
    </FeatureFlagProvider>;
  });

  it("renders the enabled component when flag is true", () => {
    const wrapper = mount(
      <FeatureFlagProvider initialFlags={{ featureFlag: true }}>
        <FeatureFlag
          name="featureFlag"
          EnabledComponent={<EnabledComponent />}
          DisabledComponent={<DisabledComponent />}
        />
      </FeatureFlagProvider>
    );

    expect(wrapper.find(".enabled").exists()).toBeTruthy;
    expect(wrapper.find(".disabled").exists()).toBeFalsy;
  });

  it("renders the disabled component when flag is false", () => {
    const wrapper = mount(
      <FeatureFlagProvider initialFlags={{ featureFlag: false }}>
        <FeatureFlag
          name="featureFlag"
          EnabledComponent={<EnabledComponent />}
          DisabledComponent={<DisabledComponent />}
        />
      </FeatureFlagProvider>
    );

    expect(wrapper.find(".enabled").exists()).toBeFalsy;
    expect(wrapper.find(".disabled").exists()).toBeTruthy;
  });

  it("renders the fallback option when flag is undefined", () => {
    const wrapper = mount(
      <FeatureFlagProvider>
        <FeatureFlag
          name="featureFlag"
          fallback={true}
          EnabledComponent={<EnabledComponent />}
          DisabledComponent={<DisabledComponent />}
        />
      </FeatureFlagProvider>
    );

    expect(wrapper.find(".enabled").exists()).toBeTruthy;
    expect(wrapper.find(".disabled").exists()).toBeFalsy;
  });

  it("renders disabled when flag and fallback is undefined", () => {
    const wrapper = mount(
      <FeatureFlagProvider>
        <FeatureFlag
          name="featureFlag"
          EnabledComponent={<EnabledComponent />}
          DisabledComponent={<DisabledComponent />}
        />
      </FeatureFlagProvider>
    );

    expect(wrapper.find(".enabled").exists()).toBeFalsy;
    expect(wrapper.find(".disabled").exists()).toBeTruthy;
  });

  it("returns true when calling non-hook function directly", () => {
    const featureFlags = {
      test: true
    };
    const enabled = getFeatureFlag(featureFlags, "test", false);

    expect(enabled).toBeTruthy;
  });

  it("returns false when calling non-hook function directly with undefined featureFlag", () => {
    const featureFlags = {
      test: true
    };
    const enabled = getFeatureFlag(featureFlags, "test2", false);

    expect(enabled).toBeFalsy;
  });

  it("throws error when a component is undefined", () => {
    expect(() =>
      mount(
        <FeatureFlagProvider initialFlags={{ featureFlag: false }}>
          <FeatureFlag
            name="featureFlag"
            EnabledComponent={<EnabledComponent />}
          />
        </FeatureFlagProvider>
      )
    ).toThrowError("a combination of enabled and disabled props is required");
  });
});
