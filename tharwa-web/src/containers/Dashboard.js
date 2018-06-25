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
            <NavLink to="deblockAccount">
              <NumberCard
                icon="unlock"
                color="f9bd38"
                title="Déblocages"
                number={this.props.nbreDeblocageComptes}
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
          <Col lg={6} md={12}>
            <NavLink to="ordresVirement">
              <NumberCard
                icon="bars"
                color="#4BB543"
                title="Ordres de virements"
                number={this.props.nbreOrdresVirements}
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
    nbreVirements,
    nbreDeblocageComptes,
    nbreOrdresVirements
  }=state.bankerDashboard;
  return { nbreInscriptions, nbreAutresComptes, nbreVirements,nbreDeblocageComptes,nbreOrdresVirements };
};

const mapDispatchToProps = dispatch => {
  return {
    getCounts: () =>
      dispatch(bankerDashboardActions.nbreRequest())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

