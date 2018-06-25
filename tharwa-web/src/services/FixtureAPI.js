
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
      data: "resgister ok"
    };
  },
  GET_stats_api:()=>{
    return {
      ok:true,
      data:         
            {
              "nbVirement":{
               "total": 112,
               "detail":[10,90]
              },
              "nbInscription":{
                "total": 70,
                "detail":[60,50]
              },
              "nbOpeation":{
                "mois":[
                  [65, 59, 30, 21, 56, 55, 40, 65, 59, 10, 41, 56],
                  [12, 20 , 40, 22, 30 , 32 , 40 , 60, 10, 46, 30, 12],
                  [12, 40 ,10, 30, 3 , 50 , 15, 6, 22, 60, 39, 10]
              ],
              "trimestre":[
                  [65, 59, 40, 11],
                  [50, 20 , 40, 22],
                  [17, 40 ,10, 30]
              ],
              "annee":[
                  [65, 59, 20, 21,65, 50, 10, 31, 52,50],
                  [22, 24 , 30, 27, 42, 8 , 10, 22, 11 , 35],
                  [42, 10 ,40, 30, 2, 20 ,40, 40, 13 , 22]
              ]
          },
          "nbCommission":{
              "jours": [65, 59, 30, 21, 56, 55, 40, 65, 59, 10, 41, 56],
              "mois": [65, 59, 30, 21, 56, 55, 40, 65, 59, 10, 41, 56],
              "trimestre":[12, 40 ,10, 30] ,
              "annee":[42, 10 ,40, 30, 2, 20 ,40, 40, 13 , 22]
          }
          }
    }
  },
  getCommissionsList_:()=>{
    return {
      ok: true,
      status: 200,
      data: [
        {"lastname":"test nom","firstname":"tesprenom","type":"comm1","montant":2500,"date":"20/06/2018"},
        {"lastname":"test2 nom","firstname":"tes2prenom","type":"comm12","montant":200,"date":"20/06/2018"},
        {"lastname":"test nom","firstname":"tesprenom","type":"comm1","montant":2500,"date":"20/06/2018"},
      ]
    };
  }

};
