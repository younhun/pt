import React, {Component} from 'react';
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import SignupForm from '../Components/SignupForm';
//KeyboardAvoidingView 키보드 올라갈시 자동 padding


export default class SignupPage extends Component {

  render(){

    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        
          <SignupForm />

      </KeyboardAvoidingView>
      );

  }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    // backgroundColor: '#e57373'
  },

  logoContainer: {
    flexGrow: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  TextStyle: {
    fontSize: 18,
    alignItems: 'center',
    marginVertical: 16
  },

});



