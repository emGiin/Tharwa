import React, { Component } from "react";
import { Col, Row } from "antd";
import { NavLink } from "react-router-dom";

import { NumberCard } from "../components/Reusable Components";

export default class Dashboard extends Component {
  render() {
    return (
      <div style={{ padding: 25 }}>
        <Row gutter={24}>
          <Col lg={6} md={12}>
            <NavLink to="virements">
              <NumberCard
                icon="swap"
                color="#4BB543"
                title="Virements"
                number={4}
              />
            </NavLink>
          </Col>
          <Col lg={6} md={12}>
            <NavLink to="demandeInscriptions">
              <NumberCard
                icon="usergroup-add"
                color="#fa541c"
                title="Inscriptions"
                number={6}
              />
            </NavLink>
          </Col>
        </Row>
      </div>
    );
  }
}
