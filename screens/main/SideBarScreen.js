import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Container, Header, Drawer, Content, Button, Icon, Body, Text } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { ScaledSheet } from 'react-native-size-matters';
import  firebase  from 'firebase';


export default class SideBarScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          currentPassword: "",
          newPassword: "",
          newEmail: "",
        };
      }
      onSignoutPress = () => {
        firebase.auth().signOut();
      }

    render() {
        return (
            <Container style={{ backgroundColor: '#ffff' }}>
                <Header >
                </Header>

                <Content>

                    <Body>
                        <Image
                            style={styles.drawerImage}
                            source={require('../../assets/Logo.png')} />
                    </Body>

                    <Button danger style={{alignSelf:'center'}} onPress={this.onSignoutPress}><Text>Sign out</Text></Button>

                </Content>
            </Container>
        )
    };
}

styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    drawerImage: {
        height: '300@ms',
        width: '300@ms',
        backgroundColor: 'grey'

    }
})
