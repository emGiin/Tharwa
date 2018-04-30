import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import Routes from './Routes';

const { Header, Content, Footer, Sider } = Layout;

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
    this.props.updateSiderWidth(this.state.collapsed ? 80 : 220);
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
        width={220}>
        <NavLink to="/">
          <div className={this.state.collapsed ? 'small-logo' : 'full-logo'} />{' '}
        </NavLink>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          selectedKeys={[this.props.location.pathname]}>
          <Menu.Item key="/">
            <NavLink to="/">
              <Icon type="home" />
              <span>Acceuil</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/notifications">
            <NavLink to="/notifications">
              <Icon type="mail" />
              <span>Notifications</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/demandeInscriptions">
            <NavLink to="/demandeInscriptions">
              <Icon type="usergroup-add" />
              <span>Demandes d'inscriptions</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/otherAccount">
            <NavLink to="/otherAccount">
              <Icon type="swap" />
              <span>Demandes d'autres comptes</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="/virements">
            <NavLink to="/virements">
              <Icon type="swap" />
              <span>Demandes de Virements</span>
            </NavLink>
          </Menu.Item>
        </Menu>
        <Icon
          className="ant-layout-sider-trigger"
          type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.toggle}
          style={this.state.collapsed ? { width: '80px' } : { width: '220px' }}
        />
      </Sider>
    );
  }
}

const SideBarWithRouter = withRouter(SideBar);

export default class AppLayout extends Component {
  state = {
    siderWidth: 220
  };

  render() {
    return (
      <Layout>
        <SideBarWithRouter
          updateSiderWidth={siderWidth =>
            siderWidth !== this.state.siderWidth &&
            this.setState({ siderWidth })
          }
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
                    Amine
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
