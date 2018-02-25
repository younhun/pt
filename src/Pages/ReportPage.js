import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Container, Content, Card, CardItem, Thumbnail, Body, Left, Right, Button } from 'native-base';

export default class ReportPage extends Component{
  static navigationOptions = {
    title : 'We R Promptech',
      headerStyle: {
        backgroundColor: '#9575cd',

    },
      headerTitleStyle: {
        color: 'white',
        fontWeight: '500'
      },
    tabBarIcon: ({tintColor}) => (
      <Icon name = 'border-color' color =  {tintColor} />
    )
  }

  constructor(props) {
    super(props);
  
    this.state = {
     data: [],
     refreshing: false,
     loading: false

    };
  }

  async getData() {
    const id = this.props.navigation.state.params.weekId

    let params = {
      "access_token": this.props.navigation.state.params.token,
      // 'page': this.state.page
    }

    let esc = encodeURIComponent
    let query = Object.keys(params)
                 .map(k => esc(k) + '=' + esc(params[k]))
                 .join('&')

    let url = 'http://localhost:3000/api/weeks/'+ id + '?' + query
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

  render(){ 

    return(
       <Container style={styles.container}>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => 
            //아래 부분 report가 있으면 출력 없으면 false로 생상
            <TouchableOpacity>
              {item.report ? 
              <Content>
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail source={require('../images/logo.png')} />
                      <Body>
                        <Text>
                          {item.name}
                        </Text>
                        
                      </Body>
                    </Left>
                  </CardItem>
                </Card>
              </Content>
              :
              false 
            }
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
  buttonText: {

  }

});