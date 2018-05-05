import React, { Component } from "react";
import { Col, Row, Tabs, Icon } from "antd";
import { NavLink } from "react-router-dom";

import { NumberCard } from "../components/Reusable Components";


import { connect } from "react-redux";

import StatsActions from '../redux/StatsRedux';


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
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
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
      data: [65, 59, 80, 81, 56, 55, 40]
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
    }
  ]
};

//---- 


const data_circle = {
labels: [
  'en attentes',
  'Acceptés'
],
datasets: [
  {
  data: [50, 30],
  backgroundColor: [
  '#CCC',
  '#36A2EB'
  ],
  hoverBackgroundColor: [
  '#FF6384',
  '#36A2EB'
  ]
}]

}
 const options={
  legend: {
      display: false,
  },
  elements: {
		arc: {
			borderWidth: 0
		}
	}
};

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      nbV:0,
      nbInscr:0,
      data_op_mois:data_op_mois,
      data_op_trimestre:data_op_trimestre,
      data_op_year:data_op_year,
      };
  }
  

  render() {
       return (
      <div style={{ padding: 25 }}>
        <Row gutter={24}>
          <Col lg={10} md={12}>
            <NavLink to="virements">
              <NumberCard
                icon="swap"
                color="#4BB543"
                title="Virements"
                number={this.props.nbV}
                data= {data_circle}
                options={options}
              />
              </NavLink>
          </Col>
          
          <Col lg={10} md={12}>
            <NavLink to="demandeInscriptions">
              <NumberCard
                icon="usergroup-add"
                color="#fa541c"
                title="Inscriptions"
                number={this.state.nbInscr}
                data= {data_circle}
                options={options}
              />
            </NavLink>
          </Col>
        </Row>
<h2>Nombre des opérations :</h2>
 

<Tabs defaultActiveKey="2">
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
<Tabs defaultActiveKey="2">
    <TabPane tab={<span className="tabBtn"><Icon type="dot-chart" />Par Jour</span>} key="1">
        <Line data={data_comm} />
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
    console.log(nextProps.nbV)
    this.setState({
        nbV: nextProps.nbV,
    });
  }
  componentWillMount = () => {
    console.log('will mount , props :'+this.props.nbV)
    this.props.updateNbV()
    this.setState({data_operations :data_op_mois})
  }
  setOperationMode_trim = ()=>{
      this.setState({data_operations:data_op_trimestre})
  }
  setOperationMode_mois = ()=>{
      this.setState({data_operations:data_op_mois})
  }
  setOperationMode_year = ()=>{
      this.setState({data_operations:data_op_year})
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