import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

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
      data: [],
      page: ''
    };
  }



  async getData() {
    let params = {
      "access_token": this.props.navigation.state.params.token,
  
    }

    let esc = encodeURIComponent
    let query = Object.keys(params)
                 .map(k => esc(k) + '=' + esc(params[k]))
                 .join('&')

    let url = 'http://wr.promptech.co.kr/api/weeks?' + query

    await fetch(url)
      .then(data => data.json())//data를 json형식으로
      .then((text) => {
        console.log('request succeeded with JSON response', text)
        this.setState({
          data: text
        })
      }).catch(function (error) {
        console.log('request failed', error)
      })
   }



  componentDidMount(){
      
    this.getData();
  }



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
          <TouchableOpacity onPress={()=>this.getData()}>
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