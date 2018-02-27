import React, {Component} from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Icon, Tile, List, ListItem, Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation'//root page 가기 위함
const ACCESS_TOKEN = 'access_token';

export default class SettingPage extends Component{
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

  


  async storeToekn(accessToken){
    try{
      await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
      
    }catch(error){
      console.log('storeToken went wrong',error)
    }
  }

  async getToken(){
    try{
      let token = await AsyncStorage.getItem(ACCESS_TOKEN);
      
      console.log("token is:" + token);
    }catch(error){
      console.log('getToken went wrong')
    }
  }

  async removeToken(){
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
      NavigationActions.navigate({ routeName: 'Login'}),
    ]
    })

    try{
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      this.getToken();
      this.props.navigation.dispatch(resetAction)

    }catch(error){
      console.log('remove token error');
    }
  }


  componentDidMount(){

    this.storeToekn(this.props.navigation.state.params.token);
    
    }

  

  render(){
    return(
      <View>
        <Button style={{marginTop: 20}}
          title='Logout'
          onPress={()=> this.removeToken()}
          backgroundColor = '#c7a4ff'
        />
      </View>
      
      );
  }
}



const styles = StyleSheet.create({
  buttonText: {

  }

});