import React, {Component} from 'react';
import { Input } from 'antd';

class PinFrom extends Component {
    render() {
        return (
            <div className="login-form">
                Insérer le code pin
                <br/>
                <Input style={{ color: 'rgba(0,0,0,.25)', "max-width": "100px", "margin-top": "20px" }} size="large" maxLength="4" placeholder="Code pin" />
            </div>
        );
    }
}

export default PinFrom;
