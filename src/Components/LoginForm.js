import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { TextField } from 'react-native-material-textfield';

const ACCESS_TOKEN = 'access_token';

export default class LoginForm extends Component{
  static navigationOptions = {
    title : 'We R Promptech',
     headerStyle: {
      backgroundColor: '#0277bd',

    },
      headerTitleStyle: {
        color: 'white',
        fontWeight: '500'
      },
     
  }
  constructor(props) {
    super(props);
  
    this.state = {
      email: '',
      password: '',
      errors: []
    };
  }

  
  async onLoginPressed(){
    try{
      let response = await fetch("http://localhost:3000/api/users/authenticate" ,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          
            password: this.state.password,
            email: this.state.email,
            
          
        })
      });

      let res = await response.text();
      
      if(response.status >= 200 && response.status < 300){
        console.log("res success is :" + res);
        this.props.navigation.navigate('Home');
      }else {
        let errors = res;
        throw errors;
      }

    }catch(errors) {
      console.log('catch errors:' + errors);

      let formErrors = JSON.parse(errors);
      let errorsArray = [];
      for(let key in formErrors){
        if(formErrors[key].length > 1){
          formErrors[key].map(error=>errorArray.push(`${key} ${error}`))
      }else {
        errorsArray.push(`${key} ${formErrors[key]}`)
        }
      }
      this.setState({errors: errorsArray});

    } 
  };
  render(){
    return(
      <View style={styles.container}>
        <TextField style={styles.fieldStyle}
          labelFontSize = {18}
          keyboardType = 'email-address'
          label='email'
          returnKeyType = 'done'
          onSubmitEditing={() => this.password.focus()} //확인 누르면 password로 focus가 맞춰진다.
          onChangeText={(val) => this.setState({email: val})} 
        />

        <TextField style={styles.fieldStyle}
          label='password'
          labelFontSize = {18}
          keyboardType = 'default'
          returnKeyType = 'go'
          secureTextEntry = {true}
          ref = {(input)=>this.password=input} //focus맞추기 위해
          onChangeText={(val) => this.setState({password: val})} 
        /> 
        <TouchableOpacity style={styles.buttonContainer} onPress={this.onLoginPressed.bind(this)}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style= {styles.signupText}>Don't you habe an account yet?</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')} >
          <Text style={styles.signupButton}>Signup </Text>
        </TouchableOpacity>    
      
        <Text>{this.state.email}</Text>
        <Text>{this.state.password}</Text>
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
    backgroundColor: '#58a5f0',
    paddingVertical: 10
  },

  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',


  }
 });