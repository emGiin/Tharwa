import React, {Component} from 'react';
import { Input } from 'antd';

class PinFrom extends Component {
    render() {
        return (
            <div className="login-form">
                Insérer le code pin
                <br/>
                <Input type="number" style={{ color: 'rgba(0,0,0,.25)', "max-width": "100px", "margin-top": "20px" }} size="large" maxLength="4" placeholder="0000" />
            </div>
        );
    }
}

export default PinFrom;
