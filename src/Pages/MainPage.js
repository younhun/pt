import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Icon } from 'react-native-elements';
import { Container, Content, Card, CardItem, Thumbnail, Body, Left, Right, Button } from 'native-base';

import CardComponent from '../Components/CardComponent';



export default class MainPage extends Component{
  static navigationOptions = {
    title : 'We R Promptech',
      headerStyle: {
        backgroundColor: '#9575cd',

    },
      headerTitleStyle: {
        color: 'white',
        fontWeight: '500'
      },
    tabBarIcon: ({ tintColor }) => (
      <Icon name = 'home' color= {tintColor}/>
      ///이부분 어렵게 해결
    )
  }
  constructor(props) {
    super(props);
  
    this.state = {
      error: '',
      
    };
  }




  async weeks(){
    const token = this.props.navigation.state.params.token;
    console.log(token);
    try{
      let response = await fetch("http://wr.promptech.co.kr/api/weeks" ,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      let res = await response.text();
      // let res1 = res.substring(10,res.length-2)
      if(response.status >= 200 && response.status < 300){
        //Handle success
        this.setState({error: ""});
        let accessToken = res;
        this.storeToekn(accessToken);
        console.log("res success is :" + accessToken);
        this.props.navigation.navigate('Home',{token: accessToken});

      }else {
        //Handle error
        let error = res;
        throw error;
      }
    }catch(error) {
      this.setState({error: error});
      console.log('catch errors:' + error);
    } 
  };

  render(){
    return(
      //card 형식으로 보여주기위해 사용

      <Container style={styles.container}>
        <Content>
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
        </Content>
          <TouchableOpacity onPress={()=>this.weeks()}>
          <Text style={styles.signupButton}> 123123</Text>
        </TouchableOpacity> 
      </Container>
      
      );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'

  }

});