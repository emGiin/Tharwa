import React from "react";
import PropTypes from "prop-types";
import { Icon, Card } from "antd";
import CountUp from "react-countup";
import { Col, Row } from "antd";

import "./Styles/NumberCard.css";

import { Doughnut} from 'react-chartjs-2';


function NumberCardGest({ icon, color, title, number, countUp, data_sent ,type=1}) {
  const circle_labels=['en attentes', 'Acceptés']
const data_ = {
	labels: circle_labels,
	datasets: [{
		data: data_sent,
		backgroundColor: [
		'#576574',
		'#01a3a4'
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

if(type==1){
    return (
    <Card
      className=" numberCardGest type1"
      
      bordered= {true} 
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
}else if(type==2){
  return (
    <Card
      className="numberCardGest type2"
      bordered= {true} 
      hoverable
      bodyStyle={{ padding: 0,width: "290px" }}
    >
      <Icon className="iconWarp" style={{ color }} type={icon} />
      <Row className="content">
      <Col lg={7} md={12} style={{width: "86px"}}>
        <p className={"titles"}> {title || "No Title"}</p>
        
        </Col>
        <Col lg={7} md={12} style={{width: "124px"}}>
        <p className="number">
          <CountUp
            start={0}
            end={number}
            duration={2}
            useEasing
            useGrouping
            separator=","
            {...countUp || {}}
          />

        </p>
        </Col>
      </Row>
    </Card>
  );
}else{
  return (
    <Card
      className="numberCardGest type3"
      bordered= {true} 
      hoverable
      bodyStyle={{ padding: 0,width: "290px" }}
    >
      <Icon className="iconWarp" style={{ color }} type={icon} />
      <Row className="content">
      <Col lg={7} md={12} style={{width: "100%"}}>
        <p className={"titles"}> {title || "No Title"}</p>
        
        </Col>
        <Col lg={7} md={12} style={{width: "100%"}}>
        <p className="number">
          <CountUp
            start={0}
            end={number}
            duration={2}
            useEasing
            useGrouping
            separator=","
            {...countUp || {}}
          />
          DZD
        </p>
        </Col>
      </Row>
    </Card>
  );
}

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
