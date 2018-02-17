import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { TextField } from 'react-native-material-textfield';


export default class LoginForm extends Component{
  constructor(props) {
    super(props);
  
    this.state = {
      email: '',
      password: '',
      errors: []
    };
  }
  
  render(){
    

    return(
      <View style={styles.container}>
        <TextField style={styles.fieldStyle}
          labelFontSize = {18}
          keyboardType = 'email-address'
          label='email'
          returnKeyType = 'done'
          onSubmitEditing={() => this.password.focus()} //확인 누르면 password로 focus가 맞춰진다.
        />

        <TextField style={styles.fieldStyle}
          label='password'
          labelFontSize = {18}
          keyboardType = 'default'
          returnKeyType = 'go'
          secureTextEntry = {true}
          ref = {(input)=>this.password=input} //focus맞추기 위해
        />     
      </View>
      );
  }
}


 const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 20
  },

  fieldStyle: {
    fontSize: 16,

  }
 });