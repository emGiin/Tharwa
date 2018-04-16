import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Button, Avatar, Col, Menu, Dropdown, Icon} from 'antd';


import MenuNotif from './notifs';


import './style.css';

 const menuUser = (
        <Menu >
          <Menu.Item key="1"><Link to="/login">deconnexion</Link></Menu.Item>
        </Menu>
      );

  
class NavBareTop  extends Component {
   
      
    
    render() {
        return (
                <ul className="barretop">
                    <li>
                    <img id="logo" style={{height:"48px"}} src="logo_web_small.png" alt="non disponible"/>
                    </li>
                    <MenuNotif />
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