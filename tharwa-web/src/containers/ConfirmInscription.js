import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ConfirmActions from "../redux/ConfirmInscriptionRedux";

import {
  RequestsTable
} from "../components/Banker";

class ConfirmInscription extends Component {
  componentWillMount(){
    this.props.getReqList();
  }

  render(){
    console.log('data',this.props.list);
    return(
      <RequestsTable list={this.props.list}/>
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
  console.log(state.confirmInscription.list)
  return { list: state.confirmInscription.list || [] };
};

const mapDispatchToProps = dispatch => {
  return {
    getReqList: () =>
      dispatch(ConfirmActions.reqListRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmInscription);
