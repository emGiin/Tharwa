import React, { Component } from 'react';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

class PinChoiceForm extends Component {
    state = {
        value: 1,
    }
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    render() {
        return (
            <div>
                Veuillez choisir comment vous recevez le code pin.
                <RadioGroup style={{ "margin-top": "20px" }} onChange={this.onChange} value={this.state.value}>
                    <Radio value={1}>Mail</Radio>
                    <Radio value={2}>SMS</Radio>
                    <Radio value={3}>J'ai déjà un code pin</Radio>
                </RadioGroup>
            </div>
            );
    }
}

export default PinChoiceForm;
