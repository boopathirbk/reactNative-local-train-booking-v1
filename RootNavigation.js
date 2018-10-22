import { Notifications } from 'expo';
import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MainScreen from './screens/main/MainScreen';
import LoginScreen from './screens/auth/LoginScreen';
import SignupScreen from './screens/auth/SignupScreen';
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen';
import SettingsScreen from './screens/main/SettingsScreen';
import AboutScreen from './screens/main/AboutScreen';
import SideBarScreen from './screens/main/SideBarScreen';

const RootStackNavigator = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    Signup: { screen: SignupScreen },
    Settings: { screen: SettingsScreen },
    About: { screen: AboutScreen },
    SideBar: { screen: SideBarScreen },
    ForgotPassword: { screen: ForgotPasswordScreen },
    Main: { screen: MainScreen },
    
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class RootNavigator extends React.Component {


  render() {
    return <RootStackNavigator />;
  }
}
