import React, { Component } from 'react';
import { Menu, Icon, Button } from 'antd';
import {Link} from 'react-router-dom';
const SubMenu = Menu.SubMenu;

export default class MenuLeft extends Component {
  state = {
    collapsed: false,
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return (
      <div style={{  }}>
      
        <Menu
        style={{height: "100%",
        position: "fixed",
        width: "inherit"}}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
        
          <Menu.Item key="1">
              <Link to="/addBanquier">
                  <Icon type="code" />
                  <span>Comptes Banquiers</span>
              </Link>
          </Menu.Item>
          
          
          <SubMenu key="sub1" title={<span><Icon type="user" /><span>Comptes Clients</span></span>}>
            <Menu.Item key="5"><Link  to="/clients"><Icon type="solution" />Gestion des clients</Link></Menu.Item>
            <Menu.Item key="6"><Link  to="/InscriptionRequests"><Icon type="user-add" />Les inscriptions en attente</ Link></Menu.Item>
            <Menu.Item key="7"><Icon type="exception" />Demandes de bébloquage</Menu.Item>
            <Menu.Item key="8"><Icon type="pay-circle-o" />Les virements en attente</Menu.Item>
            <Menu.Item key="9"><Link  to="/dashboard"><Icon type="pie-chart" />Tableau de board</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="setting" /><span>Administration THARWA</span></span>}>
            <Menu.Item key="10"><Link  to="/GestionBanques"><Icon type="bank" />Gestion des banques</Link></Menu.Item>
            <Menu.Item key="11"><Link  to="/ListCommission"><Icon type="bars" />Liste des commissions</Link></Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

