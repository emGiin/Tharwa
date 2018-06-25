let trans = require('../fixtures/TransfersList.json');
let req = require('../fixtures/RequestsList.json');
let otherList = require('../fixtures/AccountsList.json');

let pinCode, authToken;

let counts=require('../fixtures/counts.json');
let clientsList=require('../fixtures/ClientsList.json');
let transferOrders=require('../fixtures/TransferOrders.json');
let deblockList=require('../fixtures/deblockRequests.json');
export const getDatasetTemplate = data => {
  if (
    true
    //pin === require("../fixtures/realPinCode.json").pinCode &&
    //token === require("../fixtures/token.json").token
  ) {
    return {
      ok: true,
      data: data
    };
  } else {
    return {
      ok: false,
      status: 400,
      data: 'Invalid pin code or token'
    };
  }
};

export const actionTemplate = () => {
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
      data: 'Invalid pin code or token'
    };
  }
};

export default {
  setAuthToken: (token) => {authToken = token},
  setPinCode: (pin) => {pinCode = pin},

  getAuthToken: ()=>authToken,
  getPinCode: ()=>pinCode,

  removeAuthToken: () => {},
  removePinCode: () => {},

  login: authObj => {
    if (
      authObj.username === 'user@email.com' &&
      authObj.password === 'password' &&
      ['email', 'sms'].includes(authObj.confirmation_method)
    ) {
      return {
        ok: true,
        data: require('../fixtures/login.json')
      };
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials'
      };
    }
  },

  confirmPinCode: data => {
    if (
      data.pin === '1234' &&
      data.temporary_token === require('../fixtures/login.json').temporary_token
    ) {
      return {
        ok: true,
        data: require('../fixtures/pinCode.json')
      };
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid pin code'
      };
    }
  },
  getCounts: ()=>{
    return {
      ok: true,
      data: counts
    };
  }
  
  ,
  getClientsList:()=>{
    
    return{
      ok:true,
      data: clientsList
    }
  },
  accountAction:({account,motif,type})=>{
    console.log("account= ",account);
    console.log("motif= ",motif);
    console.log("type= ",type);
    
    clientsList.forEach(element => {
      element.accounts.forEach(e => {
        if(e.number===account) {
          e.isvalid=!e.isvalid;
        }
      });
    });
    return{ ok:true}
  }
  ,
  getTransferOrdersList:()=>{
    return{
      ok:true,
      data: transferOrders
    }
  },
  transferOrderAction:({id,code})=>{
    transferOrders=transferOrders.filter(e=>e.code!==id);
    return{ ok:true}
  }
  ,
  getDeblockRequestsList:()=>{
    return{
      ok:true,
      data: deblockList
    }
  },
  deblockAccountAction:({account,motif,code})=> {
    console.log("account ",account," motif ",motif," code ",code);
    deblockList=deblockList.filter(e=>e.account!==account);
    return {ok:true}
  }
  ,
  inscriptions: {
    getDataset: () => getDatasetTemplate(req),
    action: ({ id, code }) => {
      req = req.filter(e => e.email !== id);
      return actionTemplate();
    }
  },

  virements: {
    getDataset: () => getDatasetTemplate(trans),
    action: ({ id, code }) => {
      trans = trans.filter(e => e.code !== id);
      return actionTemplate();
    }
  },

  accounts: {
    getDataset: () => getDatasetTemplate(otherList),
    action: ({ id, code }) => {
      otherList = otherList.filter(e => e.id !== id);
      return actionTemplate();
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
              "virementToday":22,
              "NbOrdreVir":33,
              "NbBanquiers":50,
              "NbBanques":35,
              "montantTHRW":600000000,
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
              "annee":[42, 10 ,40, 30]
          },
          "nbCommission1": {
            "annee": {
                "2018": 3410.04012
            },
            "trimestre": {
                "2": 3410.04012
            },
            "mois": {
                "05": 40.5,
                "06": 3369.54012
            },
            "jours": {
                "20": 0.5,
                "21": 40,
                "23": 267.24,
                "24": 3102.30012
            }
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
        {"lastname":"test nom","firstname":"tesprenom","type":"comm1","montant":2500,"date":"20/06/2020"},
      ]
    };
  }

};
