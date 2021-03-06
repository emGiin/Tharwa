import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import Routes from './Routes';

import './Styles/AppLayout.css';
const { Header, Content, Footer, Sider } = Layout;

const getMenu = (clientType, location) => {
  if (clientType === 'Banquier') {
    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/']}
        selectedKeys={[location.pathname]}>
        <Menu.Item key="/">
          <NavLink to="/">
            <Icon type="home" />
            <span>Acceuil</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/accountManagement">
          <NavLink to="/accountManagement">
            <Icon type="solution" />
            <span>Gestion des comptes</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/deblockAccount">
          <NavLink to="/deblockAccount">
            <Icon type="unlock" />
            <span>Demandes de déblocage</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/demandeInscriptions">
          <NavLink to="/demandeInscriptions">
            <Icon type="user-add" />
            <span>Demandes d'inscriptions</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/otherAccount">
          <NavLink to="/otherAccount">
            <Icon type="usergroup-add" />
            <span>Demandes d'autres comptes</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/virements">
          <NavLink to="/virements">
            <Icon type="swap" />
            <span>Demandes de Virements</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/OrdresVirement">
          <NavLink to="/OrdresVirement">
            <Icon type="bars" />
            <span>Ordres de Virements</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    )
  } else if (clientType === 'Gestionnaire')
    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/']}
        selectedKeys={[location.pathname]}>
        <Menu.Item key="/dashboard">
          <NavLink to="/dashboard">
            <Icon type="home" />
            <span>Acceuil</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="/creerBanquier">
          <NavLink to="/creerBanquier">
            <Icon type="user-add" />
            <span>Creer un banquier</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    );
};

class SideBar extends Component {
  state = {
    collapsed: false
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  componentDidUpdate() {
    this.props.updateSiderWidth(this.state.collapsed ? 80 : 230);
  }

  render() {
    return (
      <Sider
        collapsed={this.state.collapsed}
        onCollapse={collapsed => {
          this.setState({ collapsed });
        }}
        breakpoint="lg"
        collapsedWidth="80"
        collapsible
        trigger={null}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0
        }}
        width={230}>
        <NavLink to="/">
          <div className={this.state.collapsed ? 'small-logo' : 'full-logo'} />{' '}
        </NavLink>
        {getMenu(this.props.clientType, this.props.location)}
        <Icon
          className="ant-layout-sider-trigger"
          type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
          style={this.state.collapsed ? { width: '80px' } : { width: '230px' }}
        />
      </Sider>
    );
  }
}

const SideBarWithRouter = withRouter(SideBar);

export default class AppLayout extends Component {
  state = {
    siderWidth: 230
  };

  render() {
    return (
      <Layout>
        <SideBarWithRouter
          updateSiderWidth={siderWidth =>
            siderWidth !== this.state.siderWidth &&
            this.setState({ siderWidth })
          }
          clientType={this.props.clientType}
        />
        <Layout
          style={{
            marginLeft: this.state.siderWidth,
            transition: 'transition: all 10s ease-in-out',
            minHeight: '100vh'
          }}>
          <Header style={{ background: '#fff', padding: 0, height: 57 }}>
            <Menu
              mode="horizontal"
              theme="light"
              trigger="click"
              style={{
                float: 'right',
                lineHeight: 4
              }}>
              <Menu.Item>
                <div>
                  <Icon type="mail" />
                </div>
              </Menu.Item>
              <Menu.SubMenu
                title={
                  <span>
                    <Icon type="user" />
                    {this.props.clientType}
                  </span>
                }>
                <Menu.Item key="logout">Sign out</Menu.Item>
              </Menu.SubMenu>
            </Menu>
          </Header>
          <Content style={{ margin: '24px 16px' }}>
            <Routes />
          </Content>
          <Footer
            style={{
              bottom: 0,
              textAlign: 'center',
              width: '100%'
            }}>
            Tharwa ©2018 Créée par Ritzy Inc.
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
