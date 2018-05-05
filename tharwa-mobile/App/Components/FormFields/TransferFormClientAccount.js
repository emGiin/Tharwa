
import React, { Component } from 'react'
import { Container, Header, Title, Content, Button, Icon, Right, Body, Left, Picker, Form, Text, Item, Input, Label } from "native-base";
import PropTypes from 'prop-types'
import { Colors, Images } from '../../Themes'
import styles from '../Styles/HeaderStyle'

import I18n from 'react-native-i18n'


const items = ['Epargne', 'Devise USD','Devise EUR'];

var BUTTONS = [
  'Courant',

];

class TransferFormClientAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected2: 'key0',
      selected3: undefined
    };

  }
  getItems(val) {
    if (val === 'key0') {
      return items;
    }
    else {
      return BUTTONS;
    }
  }
  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }
  onValueChange3(value) {
    this.setState({
      selected3: value
    });
  }
  render() {
    return (
      <Container>
        <Header style={styles.container}
          backgroundColor={Colors.background}
          androidStatusBarColor={Colors.forground} >

          <Body >
            <Title >Virement</Title>
          </Body>
         
        </Header>
        <Content style={{marginLeft:20, marginTop:10, marginBottom:50,marginRight:20, shadowOffset: { width: 5, height: 5 },
    shadowColor: Colors.white,
    shadowOpacity: 1,
    elevation: 5,
    backgroundColor: Colors.white}}>
          <Content >
            <Text  style={{marginBottom:10,  fontSize: 18, color: Colors.forground, textAlign: 'center', backgroundColor: Colors.button}}> Choisir le compte </Text>
            <Form  style={{marginBottom:20}}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                placeholder="Selectionner votre compte"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                textStyle={{ color: "#5cb85c" }}
                itemStyle={{
                  backgroundColor: "#5cb85c",
                  marginLeft: 0,
                  paddingLeft: 10
                }}
                itemTextStyle={{ color: '#788ad2' }}
                style={{ width: undefined }}
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Courant" value="key0" />
                <Picker.Item label="Epargne" value="key1" />
                <Picker.Item label="Devise USD" value="key2" />
                <Picker.Item label="Devise EUR" value="key3" />

              </Picker>
            </Form>
          </Content>
          <Content>
            <Text style={{marginBottom:10,  fontSize: 18, color: Colors.forground, textAlign: 'center', backgroundColor: Colors.button}}> Virer Vers </Text>
            <Form style={{marginBottom:20}}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                placeholder="Selectionner votre compte"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                style={{ width: undefined }}
                selectedValue={this.state.selected3}
                onValueChange={this.onValueChange3.bind(this)}>
                {this.getItems(this.state.selected2).map((item, i) => {
                  console.log('item', item);
                  return <Picker.Item label={item} key={`${i}+1`} value={i} />
                })}

              </Picker>
            </Form>
          </Content>
          <Content>
          <Text  style={{marginBottom:10,  fontSize: 18, color: Colors.forground, textAlign: 'center', backgroundColor: Colors.button}}> Introduire le montant </Text>
            <Form>
              <Item>
             
              <Input  keyboardType='numeric'>
              </Input>
              <Icon active name='swap' />
              </Item>
            </Form>
          
          </Content>
          <Button style={ {alignSelf: 'center',
    height: 40,
    
    marginTop: 70,
    borderColor: Colors.button,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: Colors.button}}>
        <Text style={{ color: '#c9d0de', textAlign: 'center' }}>Envoyer</Text>
      </Button>
        </Content>
      </Container>
    );
  }
}
export { TransferFormClientAccount } 