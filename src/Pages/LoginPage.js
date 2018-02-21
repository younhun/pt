import React, {Component} from 'react';
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import LoginForm from '../Components/LoginForm';


//KeyboardAvoidingView 키보드 올라갈시 자동 padding

export default class LoginPage extends Component {
  static navigationOptions = {
    title : 'We R Promptech',
    headerStyle: {
      backgroundColor: '#7e57c2'
    }
  }
  render(){
    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
      
        <LoginForm />
      </KeyboardAvoidingView>
      );

  }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  }
});



