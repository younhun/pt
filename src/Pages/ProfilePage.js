import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Tile, List, ListItem, Button } from 'react-native-elements';


export default class ProfilePage extends Component{
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
      <Icon name = 'person' color =  {tintColor} />
    )
  }
  constructor(props) {
    super(props);
  
    this.state = {
      current_user: [],
    };
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
        console.log('Profile Page UserData request succeeded with JSON response', text)
        
        this.setState({
          current_user: text,

          
        })
      }).catch(function (error) {
        console.log('request failed', error)

      })
   }

   onSetting(){
    this.props.navigation.navigate('SettingPage');
   }
  componentDidMount(){
    this.getUser();
  }

  render(){
    return(
      <View>
        <Tile
          imageSrc = {{uri: this.state.current_user.avatar}}
          title={this.state.current_user.name}
          captoin={this.state.current_user.email}
          />
          <Button
            title="Settings"
            buttonStyle={{marginTop: 20}}
            onPress={()=> this.onSetting()}
            />

          <List>
            <ListItem 
              title="Email"
              rightTitle={this.state.current_user.email}
              hideChevron
            />

            <ListItem 
              title="Username"
              rightTitle={this.state.current_user.name}
              hideChevron
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