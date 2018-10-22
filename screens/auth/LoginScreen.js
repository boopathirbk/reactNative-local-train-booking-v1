
import React from 'react';
import { View, Image, Text, Alert, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import { Form, Input, Item, Button, Label, Title } from 'native-base';
import { ScaledSheet } from 'react-native-size-matters';
import colors from '../../colors';
export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }
    static navigationOptions = {
        header: null
    }


    onLoginPress = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { }, (error) => { Alert.alert(error.message); });
    }

    onCreateAccountPress = () => {
        this.props.navigation.navigate("Signup")
    }

    onForgotPasswordPress = () => {
        this.props.navigation.navigate("ForgotPassword")

    }

    render() {
        return (
            <View style={styles.container}>
                <Form>
                    <Title style={{  marginTop: 75, alignSelf: "center", color:colors.titleText }}>Welcome to Local Train booking</Title>

                    <Item floatingLabel style={styles.emailInput}>
                        <Label>Email</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            returnKeyType="done"
                            onChangeText={(email) => this.setState({ email })} />
                    </Item>

                    <Item floatingLabel style={styles.passwordInput}>
                        <Label>Password</Label>
                        <Input
                            secureTextEntry={true}
                            autoCorrect={false}
                            autoCapitalize="none"
                            returnKeyType="go"
                            onSubmitEditing={this.loginUser}
                            onChangeText={(password) => this.setState({ password })} />
                    </Item>

                    <Button style={styles.resetPasswordButton}
                            full
                            rounded
                            primary
                            onPress={this.onLoginPress}>
                        <Text style={styles.resetPassword}>Login</Text>
                    </Button>

                    <Text style={{  marginTop: 20, alignSelf: 'center' }}>or</Text>

                    <Button style={styles.resetPasswordButton}
                            full
                            rounded
                            success 
                            onPress={this.onCreateAccountPress}>
                        <Text style={styles.resetPassword}>Signup</Text>
                    </Button>
                    <TouchableOpacity style={styles.forgotButton} onPress={this.onForgotPasswordPress}>
                        <Text>ForgotPassword</Text>
                    </TouchableOpacity>
                </Form>
            </View>
        );
    }
}

const styles = ScaledSheet.create({
    resetPasswordButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '50@ms',
        width: '150@ms',
    },
    mb15: {
        width: '150@ms',
        marginTop: '70@ms',
        justifyContent: "center",
        alignSelf: 'center',

    },
    mb16: {
        width: '150@ms',
        marginTop: '30@ms',
        justifyContent: "center",
        alignSelf: 'center',

    },
    mb17: {
        width: '150@ms',
        marginTop: '10@ms',
        justifyContent: "center",
        alignSelf: 'center',
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
    },
    container: {
        marginTop: '10@ms'
    },
    loginButton: {
        alignSelf: 'center',
        marginTop: '30@ms',
        width: '150@ms'
    },
    forgotButton: {
        alignSelf: 'center',
        marginEnd: "140@ms",
        marginTop: "-200@ms"
    },
    emailInput: {
        alignSelf: 'center',
        marginTop: '30@ms',

        width: '270@ms',
        alignItems: 'center',
        justifyContent: 'center'
    },
    passwordInput: {
        marginTop: '30@ms',
        alignSelf: 'center',
        width: '270@ms',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: '17@ms'
    },
    resetPassword: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: '15@ms'
    }
}

);