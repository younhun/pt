import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import { TextField } from 'react-native-material-textfield';

const ACCESS_TOKEN = 'access_token';

export default class LoginForm extends Component{
  static navigationOptions = {
    title : 'We R Promptech',
     headerStyle: {
      backgroundColor: '#9575cd',

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
      error: ""
    };
  }

  async storeToekn(accessToken){
    try{
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      this.getToken();
    }catch(error){
      console.log('storeToken went wrong')
    }
  }

  async getToken(){
    try{
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      console.log("token is:" + token);
    }catch(error){
      console.log('getToken went wrong')
    }
  }

  async removeToken(){
    try{
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      this.getToken();
    }catch(error){
      console.log('remove token error');
    }
  }




  
  async onLoginPressed(){
    try{
      let response = await fetch("http://wr.promptech.co.kr/api/users/authenticate" ,{
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
      let res1 = res.substring(10,res.length-2)
      if(response.status >= 200 && response.status < 300){
        //Handle success
        this.setState({error: ""});
        let accessToken = res1;
        this.storeToekn(accessToken);
        console.log("res success is :" + accessToken);
        this.props.navigation.navigate('Home',{token: accessToken});

      }else {
        //Handle error
        let error = res;
        throw error;
      }
    }catch(error) {
      this.removeToken();
      this.setState({error: error});
      console.log('catch errors:' + error);
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
        <TouchableOpacity style={styles.buttonContainer} onPress={()=>this.onLoginPressed()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style= {styles.signupText}>Don't you habe an account yet?</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')} >
          <Text style={styles.signupButton}>Signup </Text>
        </TouchableOpacity>    
      
        <Text style={styles.error}>{this.state.error}</Text>
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
    backgroundColor: '#c7a4ff',
    paddingVertical: 10
  },

  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
  },

  error: {
    color: 'red',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 20
  }
 });