import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Button, Avatar, Col, Menu, Dropdown, Icon} from 'antd';
import './style.css';

import {connect} from 'react-redux';
import iAmRoot from '../../redux/actions/authActions';
import {bindActionCreators} from 'redux';

 const menuUser = (
        <Menu >
          <Menu.Item key="1">deconnexion</Menu.Item>
        </Menu>
      );
class NavBareTop  extends Component {
   
      
    
    render() {
        return (
                <ul className="barretop">
                    <li>
                    <img src="logo_web_small.png" alt="non disponible"/>
                    </li>
                    <Col className="txt_menu" offset={4}>
                        <li >
                        <Link  to="/clients">Comptes Clients</Link>
                        </li>
                        <li>
                        <Link to="/newBanquier">Comptes Banquiers</Link>
                        </li>
                        <li>
                        <Link  to="/admin">Compte THARWA</Link>
                        </li>
                    </Col>
                    
                    
                    <Dropdown overlay={menuUser}>
                    <Button type="dashed">
                    <Avatar size="small" icon="user" /> Admin <Icon type="down" />
                    </Button>
                    </Dropdown>
                </ul>
                
            
        );
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({iAmRoot:iAmRoot}, dispatch);

  }

export default connect(matchDispatchToProps)(NavBareTop);