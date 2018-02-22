import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Icon } from 'react-native-elements';


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
  render(){
    return(
      <View>
      <Text> report</Text>
      </View>
      
      );
  }
}



const styles = StyleSheet.create({
  buttonText: {

  }

});