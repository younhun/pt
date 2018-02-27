import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import { Icon, Badge } from 'react-native-elements';
import { Container, Content, Card, CardItem, Thumbnail, Body, Left, Right, Button } from 'native-base';





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

    let url = 'http://wr.promptech.co.kr/api/weeks?' + query
    this.setState({loading: true});
    await fetch(url)
      .then(data => data.json())//data를 json형식으로
      .then((text) => {
        console.log('MainPage request succeeded with JSON response', text)
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
          <TouchableOpacity onPress={() => this.props.navigation.navigate('TabNav',{weekId: item.id, token: this.props.navigation.state.params.token})}>
            <Content>
              <Card> 
                <CardItem>
                  <Left>
                    <Thumbnail source={require('../images/logo.png')} />
                    <Body>
                      <Text>보고일</Text>
                      <Text note>{item.start_date} ~ {item.end_date}</Text> 
                      <Badge containerStyle={{ backgroundColor: '#c6a3ff'}}><Text style={{color: 'white'}}>{item.reports.length}</Text></Badge>
                      
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

  },
  count: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'red'
  }

});