import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Drawer, Container, Header, Left, Icon, Picker, Body, Button, Text, Form, Input, Item, Label, Title } from 'native-base';
import SideBar from '../main/SideBarScreen';
import { ScaledSheet } from 'react-native-size-matters';
import { withFormData, withFormHandlers } from "./withFormData";
import { compose } from "recompose";
import Toast, { DURATION } from 'react-native-easy-toast'

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined
    };
  }
  closeDrawer() {
    this._drawer._root.close()
  }

  openDrawer() {
    this._drawer._root.open()
  }

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }
  onValueChange3(value: string) {
    this.setState({
      selected3: value
    });
  }
  onValueChange4(value: string) {
    this.setState({
      selected4: value
    });
  }
  onValueChange5(value: string) {
    this.setState({
      selected5: value
    });
  }

  render() {
    let { formData: { name, age, number }, sendForm, updateFormData, formErrors } = this.props;

    return (
      <Drawer
        ref={(ref) => { this._drawer = ref }}
        content={<SideBar navigator={this._navigator} />}
        onClose={() => this.closeDrawer()}
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

          <ScrollView >
            <Form>

              <Item floatingLabel style={styles.emailInput}>
                <Label>Name of the Passenger</Label>
                <Input
                  onChangeText={(name) => updateFormData({ name: 'name', value: name })}
                  value={name}
                />
                <Text>{formErrors.name}</Text>
              </Item>

              <Item floatingLabel style={styles.emailInput}>
                <Label>Age</Label>
                <Input
                  onChangeText={(age) => updateFormData({ name: 'age', value: age })}
                  value={age}
                />
                <Text>{formErrors.age}</Text>
              </Item>

              <Item floatingLabel style={styles.emailInput}>
                <Label>Mobile Number</Label>
                <Input
                  onChangeText={(number) => updateFormData({ name: 'number', value: number})}
                  value={number}
                />
                <Text>{formErrors.number}</Text>
              </Item>

              <Item picker style={styles.emailInput}>
                <Label> Gender</Label>
                <Picker
                  mode="dialog"
                  placeholder=" Select your Gender"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="Male" value="key0" />
                  <Picker.Item label="Female" value="key1" />
                  <Picker.Item label="Transgender" value="key2" />
                </Picker>
              </Item>

              <Item picker style={styles.emailInput}>
                <Label> From Station</Label>
                <Picker
                  mode="dialog"
                  placeholder="Select your Source"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected2}
                  onValueChange={this.onValueChange2.bind(this)}
                >
                  <Picker.Item label="Coimbatore Main" value="key0" />
                  <Picker.Item label="North" value="key1" />
                  <Picker.Item label="Thudiyalur" value="key2" />
                  <Picker.Item label="Karamadai" value="key3" />
                  <Picker.Item label="Mettupalayam" value="key4" />
                </Picker>
              </Item>

              <Item picker style={styles.emailInput}>
                <Label> To Station</Label>
                <Picker
                  mode="dialog"
                  placeholder="Select your Destination"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected3}
                  onValueChange={this.onValueChange3.bind(this)}
                >
                  <Picker.Item label="Coimbatore Main" value="key0" />
                  <Picker.Item label="North" value="key1" />
                  <Picker.Item label="Thudiyalur" value="key2" />
                  <Picker.Item label="Karamadai" value="key3" />
                  <Picker.Item label="Mettupalayam" value="key4" />
                </Picker>
              </Item>

              <Item picker style={styles.emailInput}>
                <Label> No. of Passengers</Label>
                <Picker
                  mode="dialog"
                  placeholder="Select your Source"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected4}
                  onValueChange={this.onValueChange4.bind(this)}
                >
                  <Picker.Item label="1" value="key0" />
                  <Picker.Item label="2" value="key1" />
                  <Picker.Item label="3" value="key2" />
                  <Picker.Item label="4" value="key3" />
                </Picker>
              </Item>

              <Item picker style={styles.emailInput}>
                <Label> Select Class</Label>
                <Picker
                  mode="dialog"
                  placeholder="Select your Class"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected5}
                  onValueChange={this.onValueChange5.bind(this)}
                >
                  <Picker.Item label="First Class" value="key0" />
                  <Picker.Item label="Second Class" value="key1" />
                  <Picker.Item label="Third Class" value="key2" />
                </Picker>
              </Item>


              <Button style={styles.resetPasswordButton}
                full
                dark
                onPress={() => {
                  this.refs.toast.show('Booked Sucessfully!', DURATION.LENGTH_LONG);
                }}>
                <Text style={styles.resetPassword}>Book</Text>
              </Button>
              
              <Toast
                ref="toast"
                style={{ backgroundColor: 'black' }}
                position='bottom'
                positionValue={300}
                fadeInDuration={750}
                fadeOutDuration={1000}
                opacity={0.8}
                textStyle={{ color: 'white' }}
              />
              <Text></Text>
            </Form>


          </ScrollView>
        </Container>
      </Drawer>
    );
  }
}
let isNonEmpty = (value) => (value && value.replace(/^\s+/g, '').length > 0);
let isGreatherThan = (rule) => (value) => (value > rule);

let validators = {
  "name": [[isNonEmpty, "Please enter your name"]],
  "age": [
    [isNonEmpty, "Please enter your age"],
    [isGreatherThan(17), "You should be over the age of 18"]],
    "number": [
      [isNonEmpty,"Please enter your number"],
      [isGreatherThan(9), 'Number should be 10 digits']
    ]
}

const enhance = compose(
  withFormData({ name: "", age: "", number:"" }),
  withFormHandlers({
    rules: validators,
    onSuccess: (props) => {
      // form is valid 
      console.log('success')
    },
    onFail: (props) => {
      // form is invalid
      console.log('fail')
    }
  })
)


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
    width: '200%'
  },
  emailInput: {
    alignSelf: 'center',
    marginTop: '30@ms',

    width: '270@ms',
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

const enhanced = enhance(MainScreen);

export default enhanced;
