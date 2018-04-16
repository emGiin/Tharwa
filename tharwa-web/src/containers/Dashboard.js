import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import TitlePage from '../components/titlePage/titlePage';
import {Modal} from 'antd';

import { connect } from "react-redux";


class Dashboard extends Component {
  
  render() {
    

    return (
      <div>
      <TitlePage title="tableau de board" />
      </div>
    );
  }
}

const  mapStateToProps = (state) => {
  return {  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendData: (dataUser) => dispatch()   }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);