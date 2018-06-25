import React, { Component } from 'react';
import { Form, Icon, Input, Checkbox, Button } from 'antd';

const FormItem = Form.Item;

class NormalLoginForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="loginForm">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your E-mail!'
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="E-mail"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(<Checkbox>Se souvenir de moi</Checkbox>)}
          {
            //TODO replace by captcha
          }
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            className="primaryAction"
            // onClick={this.props.onNext}
            htmlType="submit">
            Suivant
          </Button>
        </FormItem>
      </Form>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onNext(values.email, values.password);
      }
    });
  };
}

const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm;
