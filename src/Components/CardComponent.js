import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';

export default class CardComponent extends Component{
  
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
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={require('../images/logo.png')} />
              <Body>
                <Text>Varun</Text>
                <Text note>Jan15, 2018</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})