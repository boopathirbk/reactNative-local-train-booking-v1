import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image
} from "react-native";

import { Icon, Button, Container, Header, Content, 
Left } from 'native-base'

class LogintoShopScreen extends Component {
  render() {
    return (
      <Container>

         <Header>
        <Left>
        <Icon name="ios-menu"/>
        </Left>
          </Header>
        <Content contentContainerStyle={{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
        }}>
          <Text>Logout</Text>
          </Content>
          </Container>
    );
  }
}
export default LogintoShopScreen;