import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { TextField } from 'react-native-material-textfield';


export default class SignupForm extends Component{
  constructor(props) {
    super(props);
  
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation:'',
      errors: []
    };
  }
  
  render(){
    

    return(
      <View style={styles.container}>
        <TextField style={styles.fieldStyle}
          labelFontSize = {18}
          keyboardType = 'default'
          label='name'
          returnKeyType = 'done'
          onSubmitEditing={() => this.email.focus()} //확인 누르면 password로 focus가 맞춰진다.
        />

        <TextField style={styles.fieldStyle}
          label='email'
          labelFontSize = {18}
          keyboardType = 'email-address'
          returnKeyType = 'done'
          ref = {(input)=>this.email=input} //focus맞추기 위해
          onSubmitEditing={() => this.password.focus()}
        />

        <TextField style={styles.fieldStyle}
          label='password'
          labelFontSize = {18}
          keyboardType = 'default'
          returnKeyType = 'go'
          secureTextEntry = {true}
          ref = {(input)=>this.password=input} //focus맞추기 위해
          onSubmitEditing={() => this.password_confirmation.focus()}
        />

        <TextField style={styles.fieldStyle}
          label='password_confirmation'
          labelFontSize = {18}
          keyboardType = 'default'
          returnKeyType = 'go'
          secureTextEntry = {true}
          ref = {(input)=>this.password_confirmation=input} //focus맞추기 위해
        />
      </View>
      );
  }
}


 const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  fieldStyle: {
    fontSize: 16,

  }
 });