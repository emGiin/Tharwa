export default {
  setAuthToken: () => {},
  removeAuthToken: () => {},
  login: authObj => {
    if (
      authObj.username === "user@email.com" &&
      authObj.password === "password" &&
      ["email", "sms"].includes(authObj.confirmation_method)
    ) {
      return {
        ok: true,
        data: require("../fixtures/login.json")
      };
    } else {
      return {
        ok: false,
        status: 400,
        data: "Invalid credentials"
      };
    }
  },
  confirmPinCode: data => {
    if (
      data.pin === "1234" &&
      data.temporary_token === require("../fixtures/login.json").temporary_token
    ) {
      return {
        ok: true,
        data: require("../fixtures/pinCode.json")
      };
    } else {
      return {
        ok: false,
        status: 400,
        data: "Invalid pin code"
      };
    }
  },
  getRequestsList:()=>{
    console.log('API');
    if (
      true
      //pin === require("../fixtures/realPinCode.json").pinCode &&
      //token === require("../fixtures/token.json").token
    ) {
      return {
        ok: true,
        data: require("../fixtures/RequestsList.json")
      };
    } else {
      return {
        ok: false,
        status: 400,
        data: "Invalid pin code or token"
      };
    }
  },
  inscriptionAction:()=>{
    console.log('API');
    if (
      true
      //data.pin === require("../fixtures/realPinCode.json").pinCode &&
      //data.token === require("../fixtures/token.json").token
    ) {
      return {
        ok: true
      };
    } else {
      return {
        ok: false,
        status: 400,
        data: "Invalid pin code or token"
      };
    }
  }
};
