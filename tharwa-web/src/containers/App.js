import React, { Component } from 'react';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import { BrowserRouter as Router, Route } from "react-router-dom";

import {Col,Row} from 'antd';
//containers & components
import Login from './Login';
import RegistrationForm from './createBanquier';
import NavBareTop from '../components/navBareTop/navBarTop';
import MenuLeft from '../components/menuLeft/menuLeft';


//Actions
import iAmRoot from '../redux/actions/authActions';




import './Styles/App.css';



class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
    <div>
    
      <NavBareTop />
      <Col span={5}><MenuLeft /></Col>
      <Col span={16}>
      
      <div >
        <Route path="/login" component={Login} /> 
        <Route path="/newBanquier" component={RegistrationForm} />
      </div>
      </Col>
    </div>
  </Router>
     
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
      info : state.auths
  };
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({iAmRoot:iAmRoot}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);