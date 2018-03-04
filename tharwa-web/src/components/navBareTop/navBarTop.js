import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Button, Avatar} from 'antd';
import {Col} from 'antd';
import './style.css';

import {connect} from 'react-redux';
import iAmRoot from '../../redux/actions/authActions';
import {bindActionCreators} from 'redux';


class NavBareTop  extends Component {
    state = {  }
    render() {
        return (
                <ul className="barretop">
                    <li>
                    <img src="logo_web_small.png" alt="non disponible"/>
                    </li>
                    <Col className="txt_menu" offset={6}>
                        <li >
                        <Link  to="/">Home</Link>
                        </li>
                        <li>
                        <Link to="/login">Login</Link>
                        </li>
                        <li>
                        <Link  to="/newBanquier">Ajouter banquier</Link>
                        </li>
                    </Col>
                    
                    <Button onClick = {()=>{
                        this.props.iAmRoot();    
                    }} type="dashed">
                        <Avatar  icon="user" />
                        Dashed
                    </Button>
                </ul>
                
            
        );
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({iAmRoot:iAmRoot}, dispatch);

  }

export default connect(matchDispatchToProps)(NavBareTop);