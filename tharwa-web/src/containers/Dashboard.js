import React, { Component } from "react";
import { Col, Row, Tabs, Icon } from "antd";
import { NavLink } from "react-router-dom";

import { NumberCard,NumberCardGest } from "../components/Reusable Components";

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
import {Bar, Line} from 'react-chartjs-2';

import './Styles/dashboard.css'

const TabPane = Tabs.TabPane;

const data_op_mois = {
  labels: ['Jan', 'Fev', 'Mars', 'Avril', 'Mai', 'Juin', 'Juill', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'type1',
      backgroundColor: 'green',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 0,
      
      data: [65, 59, 30, 21, 56, 55, 40, 65, 59, 10, 41, 56]
    },
    {
      label: 'type2',
      backgroundColor: 'cyan',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 0,
      
      data: [12, 20 , 40, 22, 30 , 32 , 40 , 60, 10, 46, 30, 12]
    },
    {
      label: 'type3',
      backgroundColor: 'wheat',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 0,
      
      data: [12, 40 ,10, 30, 3 , 50 , 15, 6, 22, 60, 39, 10]
    }
  ]
};
const data_op_trimestre = {
  labels: ['Trim 01', 'Trim 02', 'Trim 03', 'Trim 04'],
  datasets: [
    {
      label: 'type1',
      backgroundColor: 'green',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 0,
      
      data: [65, 59, 40, 11]
    },
    {
      label: 'type2',
      backgroundColor: 'cyan',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 0,
      
      data: [12, 20 , 40, 22]
    },
    {
      label: 'type3',
      backgroundColor: 'wheat',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 0,
      
      data: [12, 40 ,10, 30]
    }
  ]
};
const data_op_year = {
  labels: ['2009','2010', '2011', '2012','2013','2014','2015' ,'2016', '2017','2018'],
  datasets: [
    {
      label: 'type1',
      backgroundColor: 'green',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 0,
      
      data: [65, 59, 20, 21,65, 50, 10, 31, 52,50]
    },
    {
      label: 'type2',
      backgroundColor: 'cyan',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 0,
      
      data: [22, 24 , 30, 27, 42, 8 , 10, 22, 11 , 35]
    },
    {
      label: 'type3',
      backgroundColor: 'wheat',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 0,
      
      data: [42, 10 ,40, 30, 2, 20 ,40, 40, 13 , 22]
    }
  ]
};


const data_comm = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Sept','Octo', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'type1',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
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
      data: [65, 59, 80, 81, 56, 55, 40, 15, 30, 15, 40]
    },
    {
      label: 'type2',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'red',
      borderColor: 'red',
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
      data: [15, 49, 50, 21, 76, 15, 20]
    },
    {
      label: 'type3',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'red',
      borderColor: 'red',
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
      data: [25, 20, 50, 51, 70, 13, 29]
    }
  ]
};

//---- 



class Dashboard extends Component {

  constructor(props){
    super(props);
    this.state = {
      nbV:0,
      nbV_detail:[10,10],
      nbInscr:0,
      nbInscr_detail:[],
      data_op_mois:null,
      data_op_trimestre:null,
      data_op_year:null,
      data_com_jour:null,
      data_com_mois:null,
      data_com_trim:null,
      data_com_annee:null,
      stats:null
      };
  }
  


  render() {
    const now = Date.now();
    const date = new Date('December 17, 1995');
    const date1 = new Date('17-12-1995');
    
    console.log(date.getMonth()+1)
    console.log(date.getDate())
    console.log(date.getFullYear())

    const data1= createRandomData(now, 1e7, 500)
    const data2= createRandomData(now, 1e7, 500)

    console.log('PROPS.nbV_details >>:::::')
console.log(this.state.nbV_detail)

       return (
      <div style={{ padding: 25 }}>
        <Row gutter={24}>
          <Col lg={10} md={12}>
            <NavLink to="">
              <NumberCardGest
                icon="swap"
                color="#4BB543"
                title="total des virements :"
                number={this.state.nbV}
                data_sent= {this.state.nbV_detail}
              />
              </NavLink>
          </Col>
          
          <Col lg={10} md={12}>
            <NavLink to="">
              <NumberCardGest
                icon="usergroup-add"
                color="#fa541c"
                title="nombre de clients :"
                number={this.state.nbInscr}
                data_sent= {this.state.nbV_detail}
              />
            </NavLink>
          </Col>
        </Row>
<h2>Nombre des opérations :</h2> 
<Tabs defaultActiveKey="1" className="tabs_op">
    <TabPane tab={<span className="tabBtn"><Icon type="bar-chart" />Par Trimestre</span>} key="1">
        <Bar
        data={data_op_trimestre}
        width={100}
        height={2}
        options={{
          maintainAspectRatio: false
        }}
        />
    </TabPane>
    <TabPane tab={<span className="tabBtn"><Icon type="bar-chart" />Par Mois</span>} key="2">
        <Bar
        data={data_op_mois}
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
    });
  }
  componentWillMount = () => {

    //data_circle.datasets[0].data=this.props.nbV_detail
    this.props.updateNbV()
//    this.setState({data_operations :data_op_mois})
console.log('will mount , props.nbV_detail :')
console.log(this.props.nbV_detail)
  }


}


const  mapStateToProps = ({stats}) => {
  const info=stats.nbV
  console.log('mapstatToProps: data_sataaats::')
  console.log(stats)
  //const p = JSON.parse(info)
  console.log('mapStateToporprops------nbV detail ::')
  console.log(stats.nbV_detail)
  return { 
     nbV: stats.nbV,
     nbInscr: stats.nbI,
     nbV_detail: stats.nbV_detail,
     nbI_detail: stats.nbI_detail,
    //stats:stats.stats_info
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNbV: () => dispatch(StatsActions.setStats())   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withHighcharts(Dashboard, Highcharts));