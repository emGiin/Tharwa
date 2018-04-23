import React, { Component } from 'react';
import { connect } from 'react-redux';

class TableHolder extends Component {
  componentWillMount() {
    this.props.getDataset();
  }

  render() {
    const Table = this.props.table;
    return (
      <Table
        list={this.props.dataSet.list}
        fetching={this.props.dataSet.fetching}
        {...this.props}
      />
    );
  }
}

export default (table, Actions, reducer) => {
  const mapStateToProps = state => {
    const dataSet = (({ list, fetching, error, success }) => ({
      list,
      fetching,
      error,
      success
    }))(state[reducer]);

    const actionState = (({ actionFetching, actionError, actionSuccess }) => ({
      fetching: actionFetching,
      error: actionError,
      success: actionSuccess
    }))(state[reducer]);
    return { dataSet, actionState };
  };

  const mapDispatchToProps = dispatch => {
    return {
      getDataset: () => dispatch(Actions.datasetRequest()),
      rejectDemand: id => dispatch(Actions.rejectDemand(id)),
      acceptDemand: id => dispatch(Actions.acceptDemand(id)),
      setDefault: () => dispatch(Actions.setDefault())
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)((props) => (
    <TableHolder table={table} {...props} />
  ));
};
