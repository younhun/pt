import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation'; //StackNavigator로 Screen 관리 

import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import MainPage from './Pages/MainPage';



const AppStackNavigator = StackNavigator({
  Home : {
    screen : LoginPage
  },

  Signup : {
    screen : SignupPage
  },

  MainPage : {
    screen : MainPage
  }

});


export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppStackNavigator />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
