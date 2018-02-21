import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'; //StackNavigator로 Screen 관리 

import LoginForm from './src//Components/LoginForm';
import SignupForm from './src//Components/SignupForm';


import MainPage from './src/Pages/MainPage';
import ListPage from './src/Pages/ListPage';
import ProfilePage from './src/Pages/ProfilePage';
import ReportPage from './src/Pages/ReportPage';


const TabNav = TabNavigator({
  Home : {
    screen : MainPage
  },

  ReportPage: {
    screen: ReportPage
  },

  ListPage: {
    screen: ListPage
  },

  ProfilePage: {
    screen: ProfilePage
  },

  

},{
    animationEnabled: true, //tab화면 변경시 글자 날라오게
    swipeEnabled: true, //터치로 스윕시 바뀐다.
    tabBarPosition: 'bottom',
    tabBarOptions: {
      
      activeTintColor: '#58a5f0',
      inactiveTintColor: '#d1cece',
      showLabel: false,
      showIcon: true,

      style: {
        ...Platform.select({
          android:{
            backgroundColor: 'white'
          }
        })
      }

    }

  } 

);


const AppStackNavigator = StackNavigator({
  Login : {
    screen : LoginForm
  },

  Signup : {
    screen : SignupForm
  },

  
  TabNav : {
    screen: TabNav
  }


}, {
    headerMode: 'none'
  });

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        
        
        <TabNav />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
