import * as LoginComponents from "../";

describe("Login components exports", () => {
  it("should export LoginForm", () => {
    expect(LoginComponents).toHaveProperty("LoginForm");
  });
  it("should export ConfirmationMethodPrompt", () => {
    expect(LoginComponents).toHaveProperty("ConfirmationMethodPrompt");
  });
  it("should export PinForm", () => {
    expect(LoginComponents).toHaveProperty("PinForm");
  });
  it("should export Loading", () => {
    expect(LoginComponents).toHaveProperty("Loading");
  });
});
