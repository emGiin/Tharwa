
 let trans=require("../fixtures/TransfersList.json");
 let req=require("../fixtures/RequestsList.json");
export default {
  setAuthToken: () => {},
  setPinCode: () => {},
  removeAuthToken: () => {},
  removePinCode: () => {},
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
        data: req
      };
    } else {
      return {
        ok: false,
        status: 400,
        data: "Invalid pin code or token"
      };
    }
  },
  inscriptionAction:(body)=>{
    console.log(body);
    
    req=req.filter(e => e.email !== body.email);
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
  },
  getTransfersList:()=>{
    console.log(trans);
    if (
      true
      //pin === require("../fixtures/realPinCode.json").pinCode &&
      //token === require("../fixtures/token.json").token
    ) {
      return {
        ok: true,
        data: trans//require("../fixtures/TransfersList.json")
      };
    } else {
      return {
        ok: false,
        status: 400,
        data: "Invalid pin code or token"
      };
    }
  },
  transferAction:(body)=>{
    trans=trans.filter(e => e.id !== body.id);
    console.log("action:::");
    console.log(body);
    console.log(trans);
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
  },
  register_banquier :(data)=>{
    return {
      ok: true,
      status: 200,
      data: "testt ok"
    };
  }
};
