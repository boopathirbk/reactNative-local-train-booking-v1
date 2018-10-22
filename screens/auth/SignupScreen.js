
import React from 'react';
import { View, Text, TouchableOpacity, Alert, KeyboardType, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import { Form, Input, Item, Button, Label, Body, Picker, Card, Title, Content } from 'native-base';
import { ScaledSheet } from 'react-native-size-matters';
import PopupDialog from 'react-native-popup-dialog';
import colors from '../../colors';

let model = {

    _keys: [],

    _listeners: [],

    addKey(key) {
        this._keys.push(key);
        this._notify();
    },

    delKey() {
        this._keys.pop();
        this._notify();
    },

    clearAll() {
        this._keys = [];
        this._notify();
    },

    getKeys() {
        return this._keys;
    },

    onChange(listener) {
        if (typeof listener === 'function') {
            this._listeners.push(listener);
        }
    },

    _notify() {
        this._listeners.forEach((listner) => {
            listner(this);
        });
    }
};

export default class SignupScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            passwordConfirm: "",
        };
    }
    componentDidMount() {
        model.onChange((model) => {
            this.setState({ text: model.getKeys().join('') });
        });
    }

    _handleClear() {
        model.clearAll();
    }

    _handleDelete() {
        model.delKey();
    }

    _handleKeyPress(key) {
        model.addKey(key);
    }


    onSignupPress = () => {
        if (this.state.password !== this.state.passwordConfirm) {
            Alert.alert("Passwords do not match");
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { }, (error) => { Alert.alert(error.message); });

    }

    onBackToLoginPress = () => {
        var navActions = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Login" })]
        });
        this.props.navigation.dispatch(navActions);
    }
    onValueChange2() {
        this.setState({
            selected2: value
        });
    }

    render() {
        return (
            <ScrollView >

                <View style={styles.container}>
                    <Form>
                        <Title style={styles.sigtext}>Signup to get started!</Title>

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
                                value={this.state.password}
                                onChangeText={(text) => { this.setState({ password: text }) }}
                                secureTextEntry={true}
                                autoCapitalize="none"
                                autoCorrect={false} />
                        </Item>
                        <Item floatingLabel style={styles.passwordInput}>
                            <Label>Confirm Password</Label>
                            <Input
                                value={this.state.passwordConfirm}
                                onChangeText={(text) => { this.setState({ passwordConfirm: text }) }}
                                secureTextEntry={true}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </Item>

                        <Item floatingLabel style={styles.emailInput}>
                            <Label>First Name</Label>
                            <Input
                                autoCorrect={false}
                                autoCapitalize="none"
                                returnKeyType="done"
                                onChangeText={(firstName) => this.setState({ firstName })} />
                        </Item>
                        <Item floatingLabel style={styles.emailInput}>
                            <Label>Last Name</Label>
                            <Input
                                autoCorrect={false}
                                autoCapitalize="none"
                                returnKeyType="done"
                                onChangeText={(lastName) => this.setState({ lastName })} />
                        </Item>
                        <Item floatingLabel style={styles.emailInput}>
                            <Label>Age</Label>
                            <Input
                                autoCorrect={false}
                                returnKeyType="done"
                                keyboardType="decimal-pad"
                                isRenderDot={true}
                                onClear={this._handleClear.bind(this)}
                                onDelete={this._handleDelete.bind(this)}
                                onKeyPress={this._handleKeyPress.bind(this)}
                                onChangeText={(age) => this.setState({ age })} />
                        </Item>

                        <Item picker style={styles.gender}>
                            <Label> Gender</Label>
                            <Picker
                                mode="dropdown"
                                placeholder="Select your gender"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected2}
                                onValueChange={this.onValueChange2.bind(this)}
                            >
                                <Picker.Item label="Male" value="key0" />
                                <Picker.Item label="Female" value="key1" />
                                <Picker.Item label="Transgender" value="key2" />
                            </Picker>
                        </Item>
                        <Item floatingLabel style={styles.emailInput}>
                            <Label>Mobile Number</Label>
                            <Input
                                autoCorrect={false}
                                returnKeyType="done"
                                keyboardType="phone-pad"
                                isRenderDot={true}
                                onClear={this._handleClear.bind(this)}
                                onDelete={this._handleDelete.bind(this)}
                                onKeyPress={this._handleKeyPress.bind(this)}
                                onChangeText={(accountNumber) => this.setState({ accountNumber })} />

                        </Item>
                        <Item floatingLabel style={styles.emailInput}>
                            <Label>Bank Account Number</Label>
                            <Input
                                autoCorrect={false}
                                returnKeyType="done"
                                keyboardType="decimal-pad"
                                isRenderDot={true}
                                onClear={this._handleClear.bind(this)}
                                onDelete={this._handleDelete.bind(this)}
                                onKeyPress={this._handleKeyPress.bind(this)}
                                onChangeText={(accountNumber) => this.setState({ accountNumber })} />

                        </Item>

                        <Button style={styles.resetPasswordButton}
                            full
                            rounded
                            success 
                             onPress={this.onSignupPress}>
                            <Text style={styles.resetPassword}>Signup</Text>
                        </Button>

                    </Form>
                    <Card onPress={() => {
                        this.popupDialog.show()
                    }}>
                        <Text onPress={() => {
                            this.popupDialog.show()
                        }} style={{ alignSelf: 'center' }}>...By Signing up your are accepting our...</Text>
                        <Text onPress={() => {
                            this.popupDialog.show()
                        }} style={{ alignSelf: 'center', color: 'blue' }}>Terms and Conditions</Text>
                    </Card>
                    <PopupDialog ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
                        <View>
                            <Title style={styles.terms}>Terms and Conditions</Title>
                            <Text style={styles.dismiss} >Thank you for using Our App! We're happy you're here. Please read this Terms of Service agreement carefully before accessing or using GitHub. Because it is such an important contract between us and our users, we have tried to make it as clear as possible. For your convenience, we have presented these terms in a short non-binding summary followed by the full legal terms.
                        </Text>

                            <Button rounded style={styles.button} onPress={() => {
                                this.popupDialog.dismiss();
                            }}>
                                <Text style={styles.resetPassword} >Dismiss</Text>
                            </Button>

                        </View>
                    </PopupDialog>
                </View>

            </ScrollView>

        );
    }
}

const styles = ScaledSheet.create({

    sigtext: {
        marginTop: '60@ms',
        alignSelf: "center",
        color: colors.titleText
    },

    button: {
        width: '150@ms',
        marginTop: '70@ms',
        justifyContent: "center",
        alignSelf: 'center',

    },
    dismiss: {
        alignSelf: 'center',
        width: "100%"
    },
    terms: {
        width: '300@ms',
        alignSelf: 'center',
        color: colors.titleText

    },
    mb15: {
        width: '150@ms',
        marginTop: '70@ms',
        justifyContent: "center",
        alignSelf: 'center',

    },
    resetPasswordButton: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '50@ms',
        width: '150@ms',
    },
    mb16: {
        width: '150@ms',
        marginTop: '50@ms',
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
    },
    gender: {
        alignSelf: 'center',
        marginTop: '30@ms'
    },
    resetPassword: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: '15@ms'
    }
}
);