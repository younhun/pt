import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Icon } from 'react-native-elements';


export default class MainPage extends Component{
  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name = 'home' style={{color: tintColor}} />
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