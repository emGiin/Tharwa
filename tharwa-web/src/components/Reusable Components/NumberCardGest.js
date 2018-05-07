import React from "react";
import PropTypes from "prop-types";
import { Icon, Card } from "antd";
import CountUp from "react-countup";
import { Col, Row } from "antd";

import "./Styles/NumberCard.css";

import { Doughnut} from 'react-chartjs-2';


function NumberCardGest({ icon, color, title, number, countUp, data_sent }) {
  const circle_labels=['en attentes', 'Acceptés']


const data_ = {
	labels: circle_labels,
	datasets: [{
		data: data_sent,
		backgroundColor: [
		'#FF6384',
		'#36A2EB'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB'
		]
	}]
};

const options_={
  legend: {
      display: false,
  },
  elements: {
		arc: {
			borderWidth: 0
		}
	}
};


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
        <Doughnut data={data_} options={options_}/>
        </Col>
      </Row>
    </Card>
  );
}

NumberCardGest.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  countUp: PropTypes.object,
  data: PropTypes.object,
  options: PropTypes.object,
};

export default NumberCardGest;
