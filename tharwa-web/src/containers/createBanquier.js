import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import TitlePage from '../components/titlePage/titlePage';
import {Modal} from 'antd';

import { connect } from "react-redux";

import BanquierActions from '../redux/banquierRedux';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
  value: 'Algerie',
  label: 'Algerie',
  children: [{
    value: 'Alger',
    label: 'Alger',
    children: [{
      value: 'Oued Smar',
      label: 'Oued Smar',
    },{
      value: 'Bab ezouar',
      label: 'Bab ezouar',
    },{
      value: 'madania',
      label: 'madania',
    },{
      value: 'Cheraga',
      label: 'Cheraga',
    },{
      value: 'Draria',
      label: 'Draria',
    }],
  }],
}, {
  value: 'Setif',
  label: 'Setif',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

class RegistrationForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      nomValide:false,
      prenomValide:false,
      mailValide:false,
      adressValide:false,
      telValide:false,
      dataUser:null
      };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        //var adrJson  =JSON.stringify(values.adress);
        var adrStr = values.adress.join(",");  //adrJson.toString();//values.adress[0]+","+values.adress[1]+","+values.adress[2];//
        values.adress = adrStr;
        this.state= {dataUser:values};
        this.props.sendData(values);
        console.log('Send data from component ... :: '+JSON.stringify(values));
      }else {
        Modal.error({
          title: 'Erreur !',
          content: 'veuillez verifier que tous les champs sont valides.',
        });
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '213',
    })(
      <Select style={{ width: 90 }}>
        <Option value="213">+213</Option>
        <Option value="31">+31</Option>
      </Select>
    ); 

  

    return (
      <div >
      <TitlePage title="Ajouter un banquier" />
      <Form onSubmit={this.handleSubmit} className="boite">
      <FormItem
          {...formItemLayout}
          label="Nom"
          onKeyPress={this.test}
        >
          {getFieldDecorator('firstName',{
            rules: [{
              required: true,message: 'le nom est obligatoire !',
            }],
          })(
            <Input maxLength='30' />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Prenom"
        >
          {getFieldDecorator('lastName',{
            rules: [{
              required: true,message: 'prenom est obligatoire !',
            }],
          })(
            <Input  />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="E-mail"
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: 'E-mail pas valide !',
            }, {
              required: true, message: 'Introduire l\'e-mail SVP',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Mot de passe"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Entrez un mot de passe SVP!',
            }, {
              validator: this.checkConfirm,
            }],
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Confirmez le mot de passe "
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'confirmez avec le meme mot de passe SVP!',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        
        <FormItem
          {...formItemLayout}
          label="Adresse residence"
        >
          {getFieldDecorator('adress', {
            initialValue: ['Algerie', 'Alger', 'oued smar'],
            rules: [{ type: 'array', required: true, message: 'selectionez votre lieu de residence svp!' }],
          })(
            <Cascader options={residences} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Numero de téléphone"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Entrez votre numero de telephone svp!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>

        
        <FormItem {...tailFormItemLayout}>
          {getFieldDecorator('validate', {
            valuePropName: 'checked',
          })(
            <Checkbox>Je confirme que les données sont corrects et corespondent exactement à ce banquier.</Checkbox>
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button onClick={this.test} type="default" htmlType="reset">Anuller</Button>
          <Button id="submit" type="primary" htmlType="submit">valider</Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}

const  mapStateToProps = (state) => {
  return {  dataUser: state.dataUser   }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendData: (dataUser) => dispatch(BanquierActions.createBanquier(dataUser.firstName, dataUser.lastName, dataUser.email, dataUser.password,dataUser.adress,dataUser.phone ))   }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);