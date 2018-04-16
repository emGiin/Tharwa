import React, { Component } from 'react';
import {Button, Avatar, Menu, Dropdown, Icon} from 'antd';
import './style.css';


  const menuNotif= (
    <Menu >
    <Menu.Item key="1">notif1</Menu.Item>
    <Menu.Item key="2">notif2</Menu.Item>
    <Menu.Item key="3">notif3</Menu.Item>
  </Menu>
  );
export default class MenuNotif  extends Component {
   
      state={
        menuNotif: (
          <Menu >
          <Menu.Item key="1">notif1</Menu.Item>
          <Menu.Item key="2">notif2</Menu.Item>
          <Menu.Item key="3">notif3</Menu.Item>
        </Menu>
        )
      };
    
    render() {
        return (
                    <Dropdown overlay={this.state.menuNotif}>
                    <Button shape="circle" type="dashed" className="notif">
                    <Avatar size="small" icon="bell" /> 
                    </Button>
                    </Dropdown>
        );
    }

  
}

