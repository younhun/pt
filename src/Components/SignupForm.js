import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { TextField } from 'react-native-material-textfield';


export default class SignupForm extends Component{
  static navigationOptions = {
    title : 'We R Promptech',
     headerStyle: {
      backgroundColor: '#0277bd'
    },
    headerTitleStyle: {
      color: 'white',
      fontWeight: '500'
    },
  }
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
  
  async onRegisterPressed(){
    try{
      let response = await fetch("http://wr.promptech.co.kr/api/users/authenticate" ,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
          }
        })
      });

      let res = await response.text();
      
      if(response.status >= 200 && response.status < 300){
        console.log("res success is :" + res);
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
          keyboardType = 'default'
          label='name'
          returnKeyType = 'done'
          onSubmitEditing={() => this.email.focus()} //확인 누르면 password로 focus가 맞춰진다.
          onChangeText={(val) => this.setState({name: val})}
        />
        <Text>{this.state.name}</Text>

        <TextField style={styles.fieldStyle}
          label='email'
          labelFontSize = {18}
          keyboardType = 'email-address'
          returnKeyType = 'done'
          ref = {(input)=>this.email=input} //focus맞추기 위해
          onSubmitEditing={() => this.password.focus()}
          onChangeText={(val) => this.setState({email: val})} 
        />

        <TextField style={styles.fieldStyle}
          label='password'
          labelFontSize = {18}
          keyboardType = 'default'
          returnKeyType = 'go'
          secureTextEntry = {true}
          ref = {(input)=>this.password=input} //focus맞추기 위해
          onSubmitEditing={() => this.password_confirmation.focus()}
          onChangeText={(val) => this.setState({password: val})}
        />

        <TextField style={styles.fieldStyle}
          label='password_confirmation'
          labelFontSize = {18}
          keyboardType = 'default'
          returnKeyType = 'go'
          secureTextEntry = {true}
          ref = {(input)=>this.password_confirmation=input} //focus맞추기 위해
          onChangeText={(val) => this.setState({password_confirmation: val})}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={()=> {this.props.navigation.goBack(), this.onRegisterPressed()}}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>          
        
        <Text style= {styles.signupText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
          <Text style={styles.signupButton}> Sign In </Text>
        </TouchableOpacity>

        <Errors errors = {this.state.errors} />
      </View>
      );
  }
}


const Errors = (props) => {
  return(
      <View>
        {props.errors.map((error, i) => <Text key={i}>{error}</Text>)}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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