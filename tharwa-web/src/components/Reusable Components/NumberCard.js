import React from "react";
import PropTypes from "prop-types";
import { Icon, Card } from "antd";
import CountUp from "react-countup";
import { Col, Row } from "antd";

import "./Styles/NumberCard.css";

function NumberCard({ icon, color, title, number, countUp }) {
  return (
    <Card
      className="numberCard"
      bordered={false}
      hoverable
      bodyStyle={{ padding: 0,width: "290px" }}
    >
      <Icon className="iconWarp" style={{ color }} type={icon} />
      <Row className="content">
      <Col lg={7} md={12} style={{width: "86px"}}>
        <p className={"titles"}> {title || "No Title"}</p>
        <p className="number">
          <CountUp
            start={0}
            end={number}
            duration={3.75}
            useEasing
            useGrouping
            separator=","
            {...countUp || {}}
          />
        </p>
        </Col>
        <Col lg={7} md={12} style={{width: "124px"}}>
        </Col>
      </Row>
    </Card>
  );
}

NumberCard.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  countUp: PropTypes.object,
  data: PropTypes.object,
  options: PropTypes.object,
};

export default NumberCard;
