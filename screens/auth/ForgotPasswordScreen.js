
import React from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import { Container, Input, Item, Button, Label, Body } from 'native-base';
import { ScaledSheet } from 'react-native-size-matters';
export default class ForgotPasswordScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
        };
    }

    onResetPasswordPress = () => {
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(() => {
                Alert.alert("Password reset email has been sent.");
            }, (error) => {
                Alert.alert(error.message);
            });
    }


    render() {
        return (
            <Container>
                <View style={styles.root}>
                    <Text style={styles.emailText}>Please enter your email!</Text>
                    <Item floatingLabel style={styles.emailInput}>
                        <Label>Email</Label>
                        <Input
                            autoCorrect={false}
                            autoCapitalize="none"
                            onChangeText={(email) => this.setState({ email })}
                        />
                    </Item>
                    <Button style={styles.resetPasswordButton}
                        full
                        rounded
                        onPress={this.onResetPasswordPress}>
                        <Text style={styles.resetPassword}>Reset Password</Text>
                    </Button>
                    
                </View>
            </Container>
        );
    }
}

const styles = ScaledSheet.create({
    emailText: {
        marginTop: '30@ms',
        alignSelf: 'center',
        fontSize: '15@vs'
    },
    emailInput: {
        marginTop: '40@ms',
        alignSelf: 'center',
        width: '250@ms',
        alignItems: 'center',
        justifyContent: 'center'
    },
    resetPasswordButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '50@ms',
        width: '150@ms',
    },
    resetPassword: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: '15@ms'
    }
});