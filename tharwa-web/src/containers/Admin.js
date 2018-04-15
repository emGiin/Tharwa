import React, { Component } from 'react';
import { Provider } from 'react-redux'
import createStore from '../redux'

import { BrowserRouter as Router, Route } from "react-router-dom";

import {Col,Row} from 'antd';

//containers & components
import RegistrationForm from './createBanquier';
import ListBanquier from './ListeBanquier';
import NavBareTop from '../components/navBareTop/navBarTop';
import MenuLeft from '../components/menuLeft/menuLeft';
import InscriptionRequests from './InscriptionRequests';


import './Styles/App.css';


export const store = createStore()


class Admin extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className="Admin">
             <div className="routChild">
                      <NavBareTop />
                      <div className="page">
                      <Router>
                          <div className="routChild">
                                <Col span={5}><MenuLeft /></Col>
                                <Col span={16}>
                                        <div className="AdminContent">
                                              <Route path="/addBanquier" component={RegistrationForm} /> 
                                              <Route path="/ListBanquier" component={ListBanquier} /> 
                                              <Route path="/InscriptionRequests" component={InscriptionRequests}/>
                                        </div>
                                </Col>
                          </div>
                      </Router>
                          
                      </div>
            </div>
      </div>
      </Provider>
    );
  }
}




export default Admin;