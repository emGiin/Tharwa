import React, { Component } from "react";
import { connect } from "react-redux";
import { LoadingSpinner} from "../components/Reusable Components"

import ConfirmActions from "../redux/ConfirmInscriptionRedux";

import {
  RequestsTable
} from "../components/Banker";

class ConfirmInscription extends Component {
  componentWillMount(){
    this.props.getReqList();
  }

  render(){
    console.log('data',this.props.reqList.list);
    return(
      this.props.reqList.fetching? <LoadingSpinner />:
      <RequestsTable  setDefault={this.props.setDefault} actionState={this.props.DemandAction} rejectDemand={this.props.rejectDemand} acceptDemand={this.props.acceptDemand} list={this.props.reqList.list}/>
    );
  }
}

const mapStateToProps = state => {
  // extracting only some properties of state
  const reqList = (({ list,fetching, error, success }) => ({
    list,
    fetching,
    error,
    success
  }))(state.confirmInscription);

  const DemandAction= (({ actionFetching, actionError, actionSuccess }) => ({
    actionFetching,
    actionError,
    actionSuccess,
  }))(state.confirmInscription);
  return { reqList, DemandAction };
};

const mapDispatchToProps = dispatch => {
  return {
    getReqList: () => dispatch(ConfirmActions.reqListRequest()) ,
    rejectDemand: (email)=> dispatch(ConfirmActions.rejectRequest(email)) ,
    acceptDemand: (email)=> dispatch(ConfirmActions.validateRequest(email)),
    setDefault: ()=> dispatch(ConfirmActions.setDefault())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmInscription);
