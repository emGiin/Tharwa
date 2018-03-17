import React, { Component } from 'react'
import { Header as NativeHeader, Button, Icon, Body, Title, Left } from 'native-base'
import styles from './Styles/HeaderStyle'

const Header = ({ icon, text }) => {
  return (
    <NativeHeader style={styles.container}>
      <Left style={styles.leftButton}>
        <Button transparent>
          <Icon name={icon} />
        </Button>
      </Left>
      <Body style={styles.body}>
        <Title>{text}</Title>
      </Body>
    </NativeHeader>
  )
}

export { Header }