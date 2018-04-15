import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Button, Avatar, Col, Menu, Dropdown, Icon} from 'antd';
import './style.css';

 const menuUser = (
        <Menu >
          <Menu.Item key="1">deconnexion</Menu.Item>
        </Menu>
      );

  const menuNotif= (
    <Menu >
    <Menu.Item key="1">notif1</Menu.Item>
    <Menu.Item key="2">notif2</Menu.Item>
    <Menu.Item key="3">notif3</Menu.Item>
  </Menu>
  );
class NavBareTop  extends Component {
   
      
    
    render() {
        return (
                <ul className="barretop">
                    <li>
                    <img id="logo" style={{height:"48px"}} src="logo_web_small.png" alt="non disponible"/>
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
                    
                    
                    <Dropdown overlay={menuNotif}>
                    <Button shape="circle" type="dashed" className="notif">
                    <Avatar size="small" icon="bell" /> 
                    </Button>
                    </Dropdown>
                    <Dropdown overlay={menuUser}>
                    <Button type="dashed">
                    <Avatar size="small" icon="user" /> Admin <Icon type="down" />
                    </Button>
                    </Dropdown>
                </ul>
                
            
        );
    }
}

export default NavBareTop;