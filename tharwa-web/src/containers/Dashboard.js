import React, { Component } from "react";
import { Col, Row } from "antd";
import { NavLink } from "react-router-dom";

import { NumberCard } from "../components/Reusable Components";


import { connect } from "react-redux";

import StatsActions from '../redux/StatsRedux';


//chartJs 
import {Bar, Line} from 'react-chartjs-2';


const data_mois = {
  labels: ['Jan', 'Fev', 'Mars', 'Avril', 'Mai', 'Juin', 'Juill', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'type1',
      backgroundColor: 'green',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 0,
      
      data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56]
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
      
      data: [12, 40 ,10, 70, 3 , 50 , 15, 6, 22, 60, 39, 10]
    }
  ]
};

const data = {
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
  data: [70, 30],
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
      nbInscr:0
      };
  }
  

  render() {
       return (
      <div style={{ padding: 25 }}>
        <Row gutter={24}>
          <Col lg={7} md={12}>
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
          
          <Col lg={7} md={12}>
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
<h2>Nombre d opérations par mois :</h2>
        <Bar
        data={data_mois}
        width={100}
        height={50}
        options={{
          maintainAspectRatio: false
        }}
/>
<Line data={data} />
    
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