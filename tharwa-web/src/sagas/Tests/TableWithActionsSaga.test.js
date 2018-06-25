//import { call, put, select } from "redux-saga/effects";
//import FixtureAPI from "../../services/FixtureAPI";
import createSaga/*, {setCredentials}*/ from "../TableWithActionsSaga";
//import createReducer from "../../redux/TableWithActionsRedux";

//const stepper = fn => mock => fn.next(mock).value;

describe("TableWithActions SAGA", () => {
  let saga = createSaga({}, "mock");

  it("should correctly set credentials", ()=>{
    // const credentials = {authToken : "token", pinCode: "pin"}
    // setCredentials()
  })


  it("should should have function getDataset", ()=>{
    expect(typeof saga.getDataset).toBe("function")
  })


  it("should should have function acceptDemand", ()=>{
    expect(typeof saga.acceptDemand).toBe("function")
  })


  it("should should have function rejectDamand", ()=>{
    expect(typeof saga.rejectDamand).toBe("function")
  })
})
