import React, { Component } from "react";
import { Col, Row } from "antd";
import { NavLink } from "react-router-dom";

import { NumberCard } from "../components/Reusable Components";


import { connect } from "react-redux";

import StatsActions from '../redux/StatsRedux';

// import charts 
import Highcharts from 'highcharts';
import {
  HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries, PieSeries
} from 'react-jsx-highcharts';


class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      nbV:0,
      nbInscr:0
      };
  }

  render() {
    const pieData = [{
      name: 'Jane',
      y: 13
    }, {
      name: 'John',
      y: 23
    }, {
      name: 'Joe',
      y: 19
}];

    return (
      <div style={{ padding: 25 }}>
      <button onClick={this.test}>test me </button>
        <Row gutter={24}>
          <Col lg={6} md={12}>
            <NavLink to="virements">
              <NumberCard
                icon="swap"
                color="#4BB543"
                title="Virements"
                number={this.props.nbV}
              />
            </NavLink>
          </Col>
          <Col lg={6} md={12}>
            <NavLink to="demandeInscriptions">
              <NumberCard
                icon="usergroup-add"
                color="#fa541c"
                title="Inscriptions"
                number={this.state.nbInscr}
              />
            </NavLink>
          </Col>
        </Row>

        <HighchartsChart>
          <Chart />

          <Title>Combination chart</Title>

          <Legend />

          <XAxis id="x" categories={['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']} />

          <YAxis id="number">
            <ColumnSeries id="jane" name="Jane" data={[3, 2, 1, 3, 4]} />
            <ColumnSeries id="john" name="John" data={[2, 3, 5, 7, 6]} />
            <ColumnSeries id="joe" name="Joe" data={[4, 3, 3, 9, 0]} />
            <SplineSeries id="average" name="Average" data={[3, 2.67, 3, 6.33, 3.33]} />
            <PieSeries id="total-consumption" name="Total consumption" data={pieData} center={[100, 80]} size={100} showInLegend={false} />
          </YAxis>
</HighchartsChart>


      </div>
    );
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.nbV)
    this.setState({
        nbV: nextProps.nbV,
    });
  }
  componentWillMount = () => {
    console.log('will mount , props :'+this.props.nbV)
    this.props.updateNbV()
  }
  
  test =()=>{
    //this.props.updateNbV()
   // this.setState({nbV:55, nbInscr:12})
    //console.log(':: test click ::')
    //console.log(this.props.nbV)
    //alert(this.state.nbV)
  }
}


const  mapStateToProps = ({stats}) => {
  return {  nbV: stats.nbV  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNbV: () => dispatch(StatsActions.getNbVirement())   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);