import React from "react";
import { shallow } from "enzyme";

import * as LoginComponents from "../";

describe("Login components exports", () => {
  it("exports LoginForm", () => {
    expect(LoginComponents).toHaveProperty("LoginForm");
  });
  it("exports ConfirmationMethodPrompt", () => {
    expect(LoginComponents).toHaveProperty("ConfirmationMethodPrompt");
  });
  it("exports PinForm", () => {
    expect(LoginComponents).toHaveProperty("PinForm");
  });
  it("exports Loading", () => {
    expect(LoginComponents).toHaveProperty("Loading");
  });
});
