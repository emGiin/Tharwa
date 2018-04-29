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
        list={this.props.dataset.list}
        fetching={this.props.dataset.fetching}
        {...this.props}
      />
    );
  }
}

export default (table, Actions, reducer) => {
  const mapStateToProps = state => {
    return {
      dataset: state[reducer].dataset,
      actionState: state[reducer].action
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      getDataset: () => dispatch(Actions.datasetRequest()),
      rejectDemand: id => dispatch(Actions.rejectDemand(id)),
      acceptDemand: id => dispatch(Actions.acceptDemand(id)),
      setDefault: () => dispatch(Actions.setDefault())
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(props => (
    <TableHolder table={table} {...props} />
  ));
};
