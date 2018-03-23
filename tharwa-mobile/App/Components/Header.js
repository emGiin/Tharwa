import React from 'react'
import PropTypes from 'prop-types'
import { Header as NativeHeader, Button, Icon, Body, Title, Left } from 'native-base'
import styles from './Styles/HeaderStyle'
import { Colors } from '../Themes'

const Header = ({ onLeftButtonPress, icon, text }) => {
  return (
    <NativeHeader
      style={styles.container}
      backgroundColor={Colors.forground}
      androidStatusBarColor={Colors.forground}
    >
      {
        onLeftButtonPress &&
        <Left style={styles.leftButton}>
          <Button transparent onPress={onLeftButtonPress}>
            <Icon name={icon} />
          </Button>
        </Left>
      }
      <Body style={styles.body}>
        <Title>{text}</Title>
      </Body>
    </NativeHeader>
  )
}

Header.propTypes = {
  onLeftButtonPress: PropTypes.func,
  icon: PropTypes.string,
  text: PropTypes.string.isRequired
}

Header.defaultProps = {
  icon: 'md-arrow-round-back'
}

export { Header }