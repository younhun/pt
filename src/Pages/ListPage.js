import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements'


export default class ListPage extends Component{
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
      <Icon name = 'list' color =  {tintColor}  />
    )
  }

  constructor(props) {
    super(props);
  
    this.state = {
     data: [],
     refreshing: false,
     loading: false,
     

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

    let url = 'http://wr.promptech.co.kr/api/weeks/'+ id + '?' + query
    this.setState({loading: true});
    await fetch(url)
      .then(data => data.json())//data를 json형식으로
      .then((text) => {
        console.log('ListPage request succeeded with JSON response', text)
        
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
      refreshing: true,

    }, () => {
      this.getData();
    })
  }




  render(){ 
    // const user_id = 

    return(
       <View style={styles.container} >
        <List> 
          <FlatList
            data={this.state.data}
            renderItem={({item}) => 
            
            //아래 부분 report가 있으면 출력 없으면 false로 생상
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('ReportsContents',{weekId: this.props.navigation.state.params.weekId, token: this.props.navigation.state.params.token, reportId: item.report.id})}>
              {item.report ? 
              <ListItem
                roundAvatar
                avatar = {require('../images/ic_face.png')}
                // avatar={{uri: item.avatar}}
                title={item.name}
              
              />
              : 
              false 
              }
            </TouchableOpacity>
          }

            keyExtractor={item => item.id}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}//스크롤시 refresh

           />

        
        </List>
      </View>
      );
  }
}





const styles = StyleSheet.create({
  buttonText: {

  }

});