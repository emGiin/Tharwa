import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Row } from "antd";
import { NavLink } from "react-router-dom";

import bankerDashboardActions from "../redux/BankerDashboardRedux";

import { NumberCard } from "../components/Reusable Components";

class Dashboard extends Component {
  componentWillMount() {
    this.props.getCounts();
  }
  render() {
    return (
      <div style={{ padding: 25 }}>
        <Row gutter={24}>
        <Col lg={6} md={12}>
            <NavLink to="demandeInscriptions">
              <NumberCard
                icon="user-add"
                color="#fa541c"
                title="Inscriptions"
                number={this.props.nbreInscriptions}
              />
            </NavLink>
          </Col>
          <Col lg={6} md={12}>
            <NavLink to="otherAccount">
              <NumberCard
                icon="usergroup-add"
                color="#42ab9e"
                title="Autres comptes"
                number={this.props.nbreAutresComptes}
              />
            </NavLink>
          </Col>
          <Col lg={6} md={12}>
            <NavLink to="virements">
              <NumberCard
                icon="swap"
                color="#4BB543"
                title="Virements"
                number={this.props.nbreVirements}
              />
            </NavLink>
          </Col>
        </Row>
      </div>
    );
  }

}
const mapStateToProps = state => {
  const {
    nbreInscriptions,
    nbreAutresComptes,
    nbreVirements
  }=state.bankerDashboard;
  return { nbreInscriptions, nbreAutresComptes, nbreVirements };
};

const mapDispatchToProps = dispatch => {
  return {
    getCounts: () =>
      dispatch(bankerDashboardActions.nbreRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

