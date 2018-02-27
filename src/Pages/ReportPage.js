import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { TextField } from 'react-native-material-textfield';
import ActionButton from 'react-native-action-button';


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

  constructor(props) {
    super(props);
  
    this.state = {
      work: '',
      plan: '',
      error: []

    };
  }

  async onSubmitPressed(){
    let params = {
      "access_token": this.props.navigation.state.params.token,
      
    }
    const id = this.props.navigation.state.params.weekId

    let esc = encodeURIComponent
    let query = Object.keys(params)
                 .map(k => esc(k) + '=' + esc(params[k]))
                 .join('&')

    let url = 'http://wr.promptech.co.kr/api/weeks/' + id + '/reports?'  + query


    try{
      let response = await fetch(url ,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            work: this.state.work,
            plan: this.state.plan,
        })
      });
      let res = await response.text();
      if(response.status >= 200 && response.status < 300){
        //Handle success
        this.setState({error: ""});
        console.log("report success is :" + res);
        this.props.navigation.navigate('ListPage');

      }else {
        //Handle error
        let error = res;
        throw error;
      }
    }catch(error) {
      this.setState({error: error});
      console.log('report errors:' + error);
    } 
  };



  render(){


    return(
      //ScrollView = 키보드 숨기기
        <ScrollView style={styles.container} 
        scrollEnabled={true}>
            
            <TextField style={styles.fieldStyle}
            label='작업내용'
            keyboardType = 'default'
            labelFontSize = {18}
            returnKeyType = 'done'
            editable = {true}
            onChangeText={(val) => this.setState({work: val})} 
            multiline = {true}
            maxLength = {50}
            />


            <TextField style={styles.fieldStyle}
            label='금주계획'
            keyboardType = 'default'
            labelFontSize = {18}
            returnKeyType = 'done'
            editable = {true}
            onChangeText={(val) => this.setState({plan: val})} 
            multiline = {true}
            maxLength = {50}
            />


            <TouchableOpacity style={styles.buttonContainer} onPress={()=>this.onSubmitPressed()}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
        
      </ScrollView>   

 
      );
  }
}






const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 20
  },

  fieldStyle: {
    fontSize: 16,
  },

  buttonContainer: {
    backgroundColor: '#c7a4ff',
    paddingVertical: 10
  },

  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },


});