
import React, { Component } from 'react'
import { Container, Header, Title, Content, Button, Icon, Right, Body, Left, Picker, Form, Text, Item, Input, Label } from "native-base";
import PropTypes from 'prop-types'
import { Colors, Images } from '../../Themes'
import styles from '../Styles/HeaderStyle'

import I18n from 'react-native-i18n'


const items = ['Epargne', 'Devise'];

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
            <Title>Virement</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Content>
            <Text> Choisir le compte </Text>
            <Form>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                placeholder="Selectionner votre compte"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                style={{ width: undefined }}
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Courant" value="key0" />
                <Picker.Item label="Devise" value="key1" />
                <Picker.Item label="épargne" value="key2" />

              </Picker>
            </Form>
          </Content>
          <Content>
            <Text> Virer Vers </Text>
            <Form>
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

            <Form>
              <Item floatingLabel>
                <Label> Le montant</Label>
                <Input />
              </Item>
            </Form>

          </Content>
        </Content>
      </Container>
    );
  }
}
export { TransferFormClientAccount } 