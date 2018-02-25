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
      page: 2,
      refreshing: false,
      loading: false
    };
  }



  async getData() {
    let params = {
      "access_token": this.props.navigation.state.params.token,
      // 'page': this.state.page
    }

    let esc = encodeURIComponent
    let query = Object.keys(params)
                 .map(k => esc(k) + '=' + esc(params[k]))
                 .join('&')

    let url = 'http://localhost:3000/api/weeks?' + query
    this.setState({loading: true});
    await fetch(url)
      .then(data => data.json())//data를 json형식으로
      .then((text) => {
        console.log('request succeeded with JSON response', text)
        this.setState({
          data: text,
          refreshing: false
        })
      }).catch(function (error) {
        console.log('request failed', error)

      })
   }



  componentDidMount(){
    this.getData();
  }


  handleRefresh = () =>{
    this.setState({
      page: 1,
      refreshing: true,

    }, () => {
      this.getData();
    })
  }


  render(){
    return(
      //card 형식으로 보여주기위해 사용
      <Container style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => 
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ReportPage',{weekId: item.id, token: this.props.navigation.state.params.token})}>
            <Content>
              <Card> 
                <CardItem>
                  <Left>
                    <Thumbnail source={require('../images/logo.png')} />
                    <Body>
                      <Text>{item.start_date}</Text>
                      <Text>{item.end_date}</Text>
                    </Body>
                  </Left>
                </CardItem>
              </Card>
            </Content>
          </TouchableOpacity>

          }
          keyExtractor={item => item.id}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}//스크롤시 refresh


        />

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