import React, {Component} from 'react';
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import LoginForm from '../Components/LoginForm';


//KeyboardAvoidingView 키보드 올라갈시 자동 padding

export default class LoginPage extends Component {
  static navigationOptions = {
    title : 'We R Promptech'
  }
  render(){
    const { navigate } = this.props.navigation;
    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <View style={styles.logoContainer}>

          <Image 
          source={require('../images/logo.png')} />
          <Text style={styles.TextStyle}>Welcome to We R Promptech</Text>
        </View>
        <View>
          <LoginForm />

          <TouchableOpacity style={styles.buttonContainer} onPress={()=>navigate('MainPage')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style= {styles.signupText}>Don't you habe an account yet?</Text>
          <TouchableOpacity onPress={() => navigate('Signup')} >
            <Text style={styles.signupButton}>Signup </Text>
          </TouchableOpacity>
          </View>
      </KeyboardAvoidingView>
      );

  }
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
    // backgroundColor: '#616161',
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

  signupButton: {
    color: 'red',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center' 
  },

  signupText: {
    fontSize : 16,
    color: 'black',
    textAlign: 'center'
  },
    buttonContainer: {

    backgroundColor: '#ff867c',
    paddingVertical: 10
  },

  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',


  }
});



