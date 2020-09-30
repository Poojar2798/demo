import React from 'react';
import 'react-native-gesture-handler';
import { useDarkMode } from 'react-native-dark-mode';
import {Switch, View,SafeAreaView, Text, Image, Dimensions, StatusBar, AsyncStorage } from 'react-native';
const { height, width } = Dimensions.get('window');
import { CommonStyle } from '../../theme/style'
import * as colors from '../../theme/colors'
function Component() {
  const isDarkMode = useDarkMode()
  return isDarkMode
}
export default class Setting extends React.Component {
  
  constructor(props) {
    super(props);
    this.state={
      toggleSwitch:false,
      notificationSwitch:false
    }
  }

  async componentDidMount() {

    console.log("====global.DarkMode",global.DarkMode)
    
  }

  // toggleSwitch(flag){
  //     if(flag){
  //       this.setState({toggleSwitch:false})
  //       global.DarkMode=false
  //     }
  //     else if(!flag){
  //       this.setState({toggleSwitch:true})
  //       global.DarkMode=true
  //     }
  // }

  notificationSwitch(flag){
    if(flag){
      this.setState({notificationSwitch:false})
    }
    else if(!flag){
      this.setState({notificationSwitch:true})
    }
}

  render() {
    return (
      <View style={{backgroundColor:'white',borderColor:'blue',borderRadius:10,margin:15,borderWidth:2}}>
          {/* <View style={{padding:10,flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{fontSize:18,fontWeight:'bold'}}>Dark Mode</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#767577" }}
                thumbColor={this.state.toggleSwitch ? "green" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={()=>this.toggleSwitch(this.state.toggleSwitch)}
                value={this.state.toggleSwitch}
              />
          </View> */}
          <View style={{padding:10,flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{fontSize:18,fontWeight:'bold'}}>Notification</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#767577" }}
                thumbColor={this.state.notificationSwitch ? "green" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={()=>this.notificationSwitch(this.state.notificationSwitch)}
                value={this.state.notificationSwitch}
              />
          </View>
      </View>
    );
  }
}


