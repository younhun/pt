import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Icon } from 'react-native-elements';


export default class ReportPage extends Component{
  static navigationOptions = {
    tabBarIcon: ({tintColor}) => (
      <Icon name = 'border-color' style={{color: tintColor}} />
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