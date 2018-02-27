import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

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
  render(){
    return(
      <View>
      </View>
      
      );
  }
}



const styles = StyleSheet.create({
  buttonText: {

  }

});