import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'; //StackNavigator로 Screen 관리 

import LoginForm from './src//Components/LoginForm';
import SignupForm from './src//Components/SignupForm';
import ReportsContents from './src/Components/ReportsContents';


import MainPage from './src/Pages/MainPage';
import ListPage from './src/Pages/ListPage';
import ProfilePage from './src/Pages/ProfilePage';
import ReportPage from './src/Pages/ReportPage';
import EditPage from './src/Pages/EditPage';
import SettingPage from './src/Pages/SettingPage';



const TabNav = TabNavigator({
  ListPage: {
    screen: ListPage
  },

  ReportPage: {
    screen: ReportPage
  },

  ProfilePage: {
    screen: ProfilePage
  },


  

},{
    animationEnabled: true, //tab화면 변경시 글자 날라오게
    swipeEnabled: true, //터치로 스윕시 바뀐다.
    tabBarPosition: 'bottom',
    tabBarOptions: {
      
      activeTintColor: '#65499c',
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

  Home : {
    screen : MainPage
  },
  TabNav: {
    screen: TabNav
  },

  ReportsContents: {
    screen: ReportsContents
  },

  EditPage: {
    screen: EditPage
  },

  SettingPage: {
    screen: SettingPage,
    
    
  }


}, {
    // headerMode: 'none'
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
