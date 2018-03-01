import React, { Component } from 'react';
import { Steps, Button, message, Icon } from 'antd';
import './Styles/Login.css';
import LoginForm from '../components/Login/LoginForm';
import PinChoiceForm from '../components/Login/PinChoiceForm';
import PinFrom from "../components/Login/PinFrom";
const Step = Steps.Step;

const steps = [{
    title: 'Login',
    content: <LoginForm/>,
    icon : <Icon type="user" />
}, {
    title: 'Code Pin',
    content: <PinChoiceForm/>,
    icon : <Icon type="solution" />
}, {
    title: 'Vérification',
    content: <PinFrom/>,
    icon : <Icon type="login" />
}];

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    render() {
        const { current } = this.state;
        return (
            <div className="login-part">
                <Steps current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title} icon={item.icon}/>)}
                </Steps>
                <div className="steps-content">{steps[this.state.current].content}</div>
                <div className="steps-action">
                    {
                        this.state.current < steps.length - 1
                        &&
                        <Button type="primary" onClick={() => this.next()}>Next</Button>
                    }
                    {
                        this.state.current === steps.length - 1
                        &&
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                    }
                    {
                        this.state.current > 0
                        &&
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            Previous
                        </Button>
                    }
                </div>
            </div>
        );
    }
}

export default Login;
