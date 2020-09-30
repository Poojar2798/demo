import React from 'react';
import 'react-native-gesture-handler';
import { View,SafeAreaView, Text, Image, Dimensions, StatusBar, AsyncStorage } from 'react-native';
const { height, width } = Dimensions.get('window');
import { CommonStyle } from '../theme/style'
import * as colors from '../theme/colors'

export default class Splash extends React.Component {
  
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    // const token = await AsyncStorage.getItem('AccessToken')
    // console.log("Token", token);
    setTimeout(() => {
        this.props.navigation.navigate('Home')
    }, 2000);
    
  }


  render() {
    return (
      <View style={{flex:1,backgroundColor:colors.blue}}>
        {/* <Image source={require('../Assets/Images/splash.png')} style={{ width: '100%', height: height }} /> */}
      </View>
    );
  }
}


