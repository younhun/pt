import React, {Component} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Body, Left, Right, Button } from 'native-base';
import { Icon } from 'react-native-elements';
import HTMLView from 'react-native-htmlview';
import ActionButton from 'react-native-action-button';

export default class ReportsContents extends Component {
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
     reportData: [],
     lastData: [],
     user: [],
     date: '',
     error: []
    };
  }


  async getData() {
    const weekId = this.props.navigation.state.params.weekId
    const reportId = this.props.navigation.state.params.reportId

    let params = {
      "access_token": this.props.navigation.state.params.token,
      // 'page': this.state.page
    }

    let esc = encodeURIComponent
    let query = Object.keys(params)
                 .map(k => esc(k) + '=' + esc(params[k]))
                 .join('&')

    let url = 'http://wr.promptech.co.kr/api/weeks/'+ weekId + '/reports/' + reportId + '?' + query

    await fetch(url)
      .then(data => data.json())//data를 json형식으로
      .then((text) => {
        console.log('request succeeded with JSON response', text)
        
        this.setState({
          reportData: text.report,
          lastData: text.last_report,
          user: text.report.user,
          date: text.report.updated_at.substring(0,10)

  
        })
      }).catch(function (error) {
        console.log('request failed', error)

      })
   }



  componentDidMount(){
    this.getData();
  }

  


  render(){  
  
      console.log(this.state.lastData)
      return(
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={require('../images/ic_face.png')} />
                <Body>
                  <Text>
                    {this.state.user.name}
                  </Text>
                  
                </Body>
              </Left>

              <Right>
                <Body>
                  <Text>
                    {this.state.date}
                  </Text>
                </Body>
              </Right>
            </CardItem>
            <CardItem>
              <Body>
                <Text style={{color: 'red', width: 500}}>
                  작업 내용
                </Text>
                
                  <HTMLView
                   value = {this.state.reportData.work}
                   />
                
              
                <Text style={{color: 'red', width: 500}}>
                  금주 계획
                </Text>
                
                <HTMLView
                  value = {this.state.reportData.plan}
                />
                
              </Body>

            </CardItem>
            
          
          </Card>

          {this.state.lastData ?
          <Card>
            <CardItem>
              <Body>
                 <Text style={{color: 'red', width: 500}}>
                      지난주 작업 내용
                  </Text>
                  
                  <HTMLView
                    value = {this.state.lastData.work}
                  />
            
                  <Text style={{color: 'red', width: 500}}>
                    지난주 금주 계획
                  </Text>
                  
                  <HTMLView
                    value = {this.state.lastData.plan}
                  />

                </Body>
              </CardItem>
            </Card>
            :
            false
          }   
               
        </Content>
        
          <ActionButton buttonColor="#64489b">
            <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() => console.log("notes tapped!")}>
              <Icon name="md-create" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
              <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
              <Icon name="md-done-all" style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton> 
        
      </Container>
       )
      }
   
      
  }
    


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
    // backgroundColor: '#e57373'
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

  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

});



