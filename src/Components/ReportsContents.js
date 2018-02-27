import React, {Component} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, RefreshControl, List } from 'react-native';
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
     error: [],
     current_user: [],
     refreshing: false,
     loading: false,

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
    this.setState({loading: true});
    await fetch(url)
      .then(data => data.json())//data를 json형식으로
      .then((text) => {
        console.log('report get data succeeded with JSON response', text)
        
        this.setState({
          reportData: text.report,
          lastData: text.last_report,
          user: text.report.user,
          date: text.report.updated_at.substring(0,10),
          refreshing: false

  
        })
      }).catch(function (error) {
        console.log('request failed', error)

      })
   }

  async getUser() {
    const id = this.props.navigation.state.params.weekId

    let params = {
      "access_token": this.props.navigation.state.params.token,
      // 'page': this.state.page
    }

    let esc = encodeURIComponent
    let query = Object.keys(params)
                 .map(k => esc(k) + '=' + esc(params[k]))
                 .join('&')

    let url = 'http://wr.promptech.co.kr/api/users/me?' + query
    await fetch(url)
      .then(data => data.json())//data를 json형식으로
      .then((text) => {
        console.log('UserData request succeeded with JSON response', text)
        
        this.setState({
          current_user: text,

          
        })
      }).catch(function (error) {
        console.log('request failed', error)

      })
   }




  componentDidMount(){
    this.getData();
    this.getUser();
  }

  async edit(current_user){
    const token = this.props.navigation.state.params.token;
    if(current_user.email === this.state.user.email){
      console.log("edit");
      this.props.navigation.navigate('EditPage',{weekId: this.props.navigation.state.params.weekId, token: this.props.navigation.state.params.token, reportId: this.props.navigation.state.params.reportId});


    }else{
      console.log("Cant't edit");
      Alert.alert("Can't edit");
    }
  }

  async delete(current_user){
    if(current_user.email === this.state.user.email){
       let report_id = this.state.reportData.id
       const weekId = this.props.navigation.state.params.weekId
       
       let params = {
          "access_token": this.props.navigation.state.params.token,
          // 'page': this.state.page
        }

        let esc = encodeURIComponent
        let query = Object.keys(params)
                     .map(k => esc(k) + '=' + esc(params[k]))
                     .join('&')
        
        let url = 'http://localhost:3000/api/weeks/' + weekId + '/reports/' + report_id + '/delete?'  + query
        let response = await fetch(url, {method: 'delete'})
          let res = await response;
        
       
        this.props.navigation.goBack()
    }else{
      console.log("Cant't delete");
      Alert.alert("Can't delete");
    }

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

      <Container>
        <Content refreshControl={
              <RefreshControl 
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}//스크롤시 refresh
              />
          }>               
          <Card >
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
            <ActionButton.Item buttonColor='#9b59b6' title="Edit" onPress={() => this.edit(this.state.current_user)}>
              <Icon name="create" style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item buttonColor='#3498db' title="Delete" onPress={() => this.delete(this.state.current_user)}>
              <Icon name="delete" style={styles.actionButtonIcon} />
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



