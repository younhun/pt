import React, {Component} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { FormLabel, FormInput } from 'react-native-elements'


export default class EditPage extends Component{
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
      error: [],
      reportData: []

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

    let url = 'http://localhost:3000/api/weeks/' + id + '/reports?'  + query


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
        this.props.navigation.goBack();

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

  async getData() {
    const weekId = this.props.navigation.state.params.weekId
    const reportId = this.props.navigation.state.params.reportId
    let params = {
      "access_token": this.props.navigation.state.params.token,
      // 'page': this.state.page
    }

    let esc = encodeURIComponent
    let query = Object.keys(params)
                 .map(k => esc(k) + '=' + esc(params[k]))
                 .join('&')

    let url = 'http://localhost:3000/api/weeks/'+ weekId + '/reports/' + reportId + '?' + query
    await fetch(url)
      .then(data => data.json())//data를 json형식으로
      .then((text) => {
        console.log('editpage get data succeeded with JSON response', text)
        this.setState({
          reportData: text.report,
        
        })
      }).catch(function (error) {
        console.log('request failed', error)

      })
   }

   componentDidMount(){
    this.getData();
    
  }

  render(){

    const text = this.state.reportData.work
    return(
      //ScrollView = 키보드 숨기기
        <ScrollView style={styles.container} 
        scrollEnabled={true}>
            
            <FormLabel >작업 내용</FormLabel>
            <FormInput style = {{width: '100%'}}
            defaultValue = {this.state.reportData.work}
            
            onChangeText= {(val) => 
            
            this.setState({work: val})
            
            }
            
              
            keyboardType = 'default'
            multiline = {true}
            returnKeyType = 'done'
            />

            <FormLabel >금주 계획</FormLabel>
            <FormInput style = {{width: '100%'}} 
            defaultValue = {this.state.reportData.plan}
            onChangeText = {(val) => this.setState({plan: val})}
          
            keyboardType = 'default'
            multiline = {true}
            returnKeyType = 'done'
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
    paddingVertical: 10,
    marginTop: 20
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