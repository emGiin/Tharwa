import React, { Component } from "react";
import { connect } from "react-redux";
import { LoadingSpinner } from "../components/Reusable Components";

import CommissionActions from "../redux/CommissionsRedux";

import  CommissionsTable  from "../components/CommissionsTable";

class Commissions extends Component {
  componentWillMount() {
    this.props.getReqList();
  }

  render() {
    console.log("data commisioinn dans container is ", this.props.reqList.list);
    return (

      <CommissionsTable
        setDefault={this.props.setDefault}
        actionState={this.props.DemandAction}
        rejectDemand={this.props.rejectDemand}
        acceptDemand={this.props.acceptDemand}
        list={this.props.reqList.list}
        fetching={this.props.reqList.fetching}
      />
    );
  }
}

const mapStateToProps = state => {
  // extracting only some properties of state
  const reqList = (({ list, fetching, error, success }) => ({
    list,
    fetching,
    error,
    success
  }))(state.confirmInscription);

  const DemandAction = (({ actionFetching, actionError, actionSuccess }) => ({
    actionFetching,
    actionError,
    actionSuccess
  }))(state.confirmInscription);
  return { reqList, DemandAction };
};

const mapDispatchToProps = dispatch => {
  return {
    getReqList: () => dispatch(CommissionActions.reqListComm()),
    setDefault: () => dispatch(CommissionActions.setDefault())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Commissions);
