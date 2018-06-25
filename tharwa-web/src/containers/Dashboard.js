import React, { Component } from "react";
import { Col, Row, Tabs, Icon } from "antd";
import { NavLink } from "react-router-dom";

import { NumberCard, NumberCardGest } from "../components/Reusable Components";

import { connect } from "react-redux";

import StatsActions from '../redux/StatsRedux';

//highcharts 
import Highcharts from 'highcharts/highstock';
import {
  HighchartsStockChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend,
  AreaSplineSeries, SplineSeries, Navigator, RangeSelector, Tooltip
} from 'react-jsx-highstock';
import { createRandomData } from './data-helper';

//chartJs 
import { Bar, Line } from 'react-chartjs-2';

import './Styles/dashboard.css'

const TabPane = Tabs.TabPane;

/*
**  Donnée des opérations par types
*/
var type_vir1 = {
  label: 'VIR inner-THRW',
  backgroundColor: '#00d2d3',
  borderWidth: 0,
  data: null
};
var type_vir2 = {
  label: 'VIR THRW-THRW',
  backgroundColor: '#222f3e',
  borderWidth: 0,
  data: null
}
var type_vir3 = {
  label: 'VIR THRW-EXTR',
  backgroundColor: '#10ac84',
  borderWidth: 0,
  data: null
};
var type_comm1 = {
  label: 'VIR inner-THRW',
  fill: false,
  lineTension: 0.1,
  backgroundColor: '#00d2d3',
  borderColor: '#00d2d3',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: 'gray',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: 'black',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
  data: null
};

var type_comm2 = {
  label: 'VIR THRW-THRW',
  fill: false,
  lineTension: 0.1,
  backgroundColor: '#222f3e',
  borderColor: '#222f3e',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: 'gray',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: 'black',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
  data: null
};

var type_comm3 = {
  label: 'VIR THRW-EXTR',
  fill: false,
  lineTension: 0.1,
  backgroundColor: '#10ac84',
  borderColor: '#10ac84',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: 'gray',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: 'black',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
  data: null
};

var data_op_mois = [];
var data_op_trimestre = [];
var data_op_year = [];

var data_comm;

var d1, d2, d3;

var data_op_mois1 = [20, 58, 11, 30, 14, 55, 20];
var data_op_mois2 = [20, 58, 11, 30, 14, 55, 20];
var data_op_mois3 = [20, 58, 11, 30, 14, 55, 20];

function init_data(state) {

  console.log("debut init data : state =",state);
  data_op_mois1=state.data_op_mois[0];
  data_op_mois2=state.data_op_mois[1];
  data_op_mois3=state.data_op_mois[2];

  d1 = { ...type_vir1, data: data_op_mois1};
  d2 = { ...type_vir2, data: data_op_mois2};
  d3 = { ...type_vir3, data: data_op_mois3};

  data_op_mois = {
    labels: ['Jan', 'Fev', 'Mars', 'Avril', 'Mai', 'Juin', 'Juill', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [
      d1, d2, d3
    ]
  };

  d1 = [];
  d2 = [];
  d3 = [];

  d1 = { ...type_vir1, data: state.data_op_trimestre[0] };
  d2 = { ...type_vir2, data: state.data_op_trimestre[1] };
  d3 = { ...type_vir3, data: state.data_op_trimestre[2] };

  data_op_trimestre = {
    labels: ['Trim 01', 'Trim 02', 'Trim 03', 'Trim 04'],
    datasets: [
      d1, d2, d3
    ]
  };
  d1 = null;
  d2 = null;
  d3 = null;
  d1 = { ...type_vir1, data: state.data_op_year[0] };
  d2 = { ...type_vir2, data: state.data_op_year[1] };
  d3 = { ...type_vir3, data: state.data_op_year[2] };

  data_op_year = {
    labels: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
    datasets: [
      d1, d2, d3
    ]
  };
  d1 = null;
  d2 = null;
  d3 = null;

  /**
   *  / Fin données opérations par types
   */

  /**
   * Les données de commissions
   */

  d1 = { ...type_comm1, data: state.data_op_year[0] };
  d2 = { ...type_comm2, data: state.data_op_year[1] };
  d3 = { ...type_comm3, data: state.data_op_year[2] };


  data_comm = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Sept', 'Octo', 'Nov', 'Dec'],
    datasets: [
      d1, d2, d3
    ]
  };
  /**
   * Fin des données des commissions
   */

  console.log("FIN init data : data_op_trimeste =",data_op_trimestre);
  console.log("FIN init data : dataop_mois =",data_op_mois);
  console.log("FIN init data : data_op_year =",data_op_year);
}




class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      nbV: 0,
      nbV_detail: [10, 10],
      nbInscr: 0,
      nbInscr_detail: [],
      data_op_mois: [],
      data_op_trimestre: [],
      data_op_year: [],
      data_com_jour: [],
      data_com_mois: [],
      data_com_trim: [],
      data_com_annee: [],
      stats: []
    };
    
  }

  

  render() {
    const now = Date.now();
    const date = new Date('December 17, 1995');
    const date1 = new Date('17-12-1995');

    const data1 = createRandomData(now, 1e7, 500)
    const data2 = createRandomData(now, 1e7, 500)

    init_data(this.state);

    if (this.state.error) return <h2> une erreur est passé</h2>
    return (
      <div style={{ padding: 25 }}>
        <Row gutter={24}>
          <Col lg={8} md={12}>

            <NumberCardGest
              icon="swap"
              color="#4BB543"
              title="total des virements :"
              number={this.state.nbV}
              data_sent={this.state.nbV_detail}
            />
          </Col>

          <Col lg={8} md={12}>
            <NumberCardGest
              icon="usergroup-add"
              color="#fa541c"
              title="nombre de clients :"
              number={this.state.nbInscr}
              data_sent={this.state.nbInscr_detail}
            />
          </Col>
          <Col lg={8} md={12}>
            <NumberCardGest
              icon="usergroup-add"
              color="#fa541c"
              title="nombre de banquiers :"
              number={this.state.nbInscr}
              type={2}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col lg={8} md={12}>

            <NumberCardGest
              icon="swap"
              color="#4BB543"
              title="Les virements d'aujourd'huit :"
              number={this.state.nbV}
              type={2}
            />
          </Col>

          <Col lg={8} md={12}>
            <NumberCardGest
              icon="usergroup-add"
              color="#fa541c"
              title="Clients inscrit aujourd'huit :"
              number={this.state.nbInscr}
              type={2}
            />
          </Col>
          <Col lg={8} md={12}>
            <NumberCardGest
              icon="usergroup-add"
              color="#fa541c"
              title="Banquiers connectés :"
              number={this.state.nbInscr}
              type={2}
            />
          </Col>
        </Row>
        <h2>Nombre des opérations :</h2>
        <Tabs defaultActiveKey="1" className="tabs_op">
          {console.log("testssssss", data_op_trimestre, data_op_year, data_op_mois)}
          
          <TabPane tab={<span className="tabBtn"><Icon type="bar-chart" />Par Mois</span>} key="1">
            <Bar
              data={data_op_mois}
              width={100}
              height={2}
              options={{
                maintainAspectRatio: false
              }}
            />
          </TabPane>
          <TabPane tab={<span className="tabBtn"><Icon type="bar-chart" />Par Trimestre</span>} key="2">
            <Bar
              data={data_op_trimestre}
              width={100}
              height={2}
              options={{
                maintainAspectRatio: false
              }}
            />
          </TabPane>
          
          <TabPane tab={<span className="tabBtn"><Icon type="bar-chart" />Par Année</span>} key="3">
            <Bar
              data={data_op_year}
              width={100}
              height={2}
              options={{
                maintainAspectRatio: false
              }}
            />
          </TabPane>
        </Tabs>


        <h2>Revenus des Commissions :</h2>
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span className="tabBtn"><Icon type="dot-chart" />Par Jour</span>} key="1">
            <HighchartsStockChart>
              <Chart zoomType="x" />

              <Title>Commissions :</Title>

              <Legend>
                <Legend.Title>temps</Legend.Title>
              </Legend>

              <RangeSelector>
                <RangeSelector.Button count={1} type="day">1d</RangeSelector.Button>
                <RangeSelector.Button count={7} type="day">7d</RangeSelector.Button>
                <RangeSelector.Button count={1} type="month">1m</RangeSelector.Button>
                <RangeSelector.Button type="all">All</RangeSelector.Button>
                <RangeSelector.Input boxBorderColor="#7cb5ec" />
              </RangeSelector>

              <Tooltip />

              <XAxis>
                <XAxis.Title>temps</XAxis.Title>
              </XAxis>

              <YAxis id="mountant">
                <YAxis.Title>mountant(DZD)</YAxis.Title>
                <AreaSplineSeries id="profit" name="Profit" data={data1} />
              </YAxis>

              <Navigator>
                <Navigator.Series seriesId="mountant" />
              </Navigator>
            </HighchartsStockChart>

          </TabPane>
          <TabPane tab={<span className="tabBtn"><Icon type="dot-chart" />Par Mois</span>} key="2">
            <Line data={data_comm} />
          </TabPane>
          <TabPane tab={<span className="tabBtn"><Icon type="bar-chart" />Par Trimestre</span>} key="3">
            <Line data={data_comm} />
          </TabPane>
          <TabPane tab={<span className="tabBtn"><Icon type="dot-chart" />Par Année</span>} key="4">
            <Line data={data_comm} />
          </TabPane>
        </Tabs>


      </div>
    );
  }


  componentWillReceiveProps(nextProps) {

    this.setState({
      nbV: nextProps.nbV,
      nbInscr: nextProps.nbInscr,
      nbV_detail: nextProps.nbV_detail,
      nbInscr_detail: nextProps.nbI_detail,
      data_op_mois: nextProps.data_op_mois,
      data_op_trimestre: nextProps.data_op_trimestre,
      data_op_year: nextProps.data_op_year,
    });

   
    //console.log("will receive props , stat = ",nextProps);
  }
  componentWillMount = () => {

 
    this.props.updateNbV()

  }


}


const mapStateToProps = ({ stats }) => {
  const info = stats.nbV

  console.log('mapStateToporprops------ stats ::')
  var d = stats;

  console.log(JSON.stringify(d))
  return {
    nbV: stats.nbV,
    nbInscr: stats.nbI,
    nbV_detail: stats.nbV_detail,
    nbI_detail: stats.nbI_detail,
    data_op_mois: stats.data_op.mois,
    data_op_trimestre: stats.data_op.trimestre,
    data_op_year: stats.data_op.annee,
    //stats:stats.stats_info
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNbV: () => dispatch(StatsActions.setStats())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withHighcharts(Dashboard, Highcharts));