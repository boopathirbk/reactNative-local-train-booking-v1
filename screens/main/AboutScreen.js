import React from 'react';
import { ScrollView, StyleSheet, TextInput, Alert, Button } from 'react-native';
import * as firebase from 'firebase';
import { Drawer, Container, Header, Left, Icon, Body, Title, Right } from 'native-base';
import SideBar from '../main/SideBarScreen';
import { ScaledSheet } from 'react-native-size-matters';

export default class AboutScreen extends React.Component {

  closeDrawer() {
    this._drawer._root.close()
  }

  openDrawer() {
    this._drawer._root.open()
  }

  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      newEmail: "",
      menuOpen: false
    };
  }

  // Occurs when signout is pressed...
  onSignoutPress = () => {
    firebase.auth().signOut();
  }

  // Reauthenticates the current user and returns a promise...
  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  // Changes user's password...
  onChangePasswordPress = () => {
    this.reauthenticate(this.state.currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(this.state.newPassword).then(() => {
        Alert.alert("Password was changed");
      }).catch((error) => { console.log(error.message); });
    }).catch((error) => { console.log(error.message) });
  }

  // Changes user's email...
  onChangeEmailPress = () => {
    this.reauthenticate(this.state.currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updateEmail(this.state.newEmail).then(() => {
        Alert.alert("Email was changed");
      }).catch((error) => { console.log(error.message); });
    }).catch((error) => { console.log(error.message) });
  }


  render() {
    return (
      <Drawer
        ref={(ref) => { this._drawer = ref; }}
        content={<SideBar navigator={this._navigator} />}
        onClose={() => this.closeDrawer()} >
        >
      <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.openDrawer()}>
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title style={styles.title}>Welcome</Title>
            </Body>
          </Header>


          <ScrollView style={{ flex: 1, flexDirection: "column", paddingVertical: 50, paddingHorizontal: 10, }}>

            <Button title="Sign out" onPress={this.onSignoutPress} />

            <TextInput style={styles.textInput} value={this.state.currentPassword}
              placeholder="Current Password" autoCapitalize="none" secureTextEntry={true}
              onChangeText={(text) => { this.setState({ currentPassword: text }) }}
            />

            <TextInput style={styles.textInput} value={this.state.newPassword}
              placeholder="New Password" autoCapitalize="none" secureTextEntry={true}
              onChangeText={(text) => { this.setState({ newPassword: text }) }}
            />

            <Button title="Change Password" onPress={this.onChangePasswordPress} />

            <TextInput style={styles.textInput} value={this.state.newEmail}
              placeholder="New Email" autoCapitalize="none" keyboardType="email-address"
              onChangeText={(text) => { this.setState({ newEmail: text }) }}
            />

            <Button title="Change Email" onPress={this.onChangeEmailPress} />

          </ScrollView>
        </Container>
      </Drawer>
    );
  }
}

const styles = ScaledSheet.create({
  text: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: '20@ms',
  },
  textInput: {
    borderWidth: '1@ms',
    marginVertical: '20@ms',
    padding: '10@ms',
    height: '40@ms',
    alignSelf: "stretch",
    fontSize: '18@ms',
  },
  title: {
    paddingHorizontal: '170@ms',
    width: '400@ms'
  }
});
