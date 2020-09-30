import React from 'react';
import 'react-native-gesture-handler';
import { View,SafeAreaView, Text, Image, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
const { height, width } = Dimensions.get('window');
import { CommonStyle } from '../theme/style'
import * as colors from '../theme/colors'
import DeviceInfo from 'react-native-device-info';
let isTablet = DeviceInfo.isTablet()
export default class Search extends React.Component {
  
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.props.navigation.setOptions({
        headerLeft: () => (
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Image style={{ marginLeft: 10, width:  20, height: 20, transform: [{ rotate: '180deg' }]}} source={require('../Images/next.png')} />
          </TouchableOpacity>
        ),
        headerShown: true, gestureEnabled: false,
        headerTitleStyle: { alignSelf: "center", fontWeight: 'bold', fontSize: isTablet ? 30 : 22 },
        headerTitle: 'Search',
        headerRight: () => (<Text />)
      })
    
  }


  render() {
    return (
      <View style={{flex:1,backgroundColor:colors.lightGray}}>
        {/* <Image source={require('../Assets/Images/splash.png')} style={{ width: '100%', height: height }} /> */}
      </View>
    );
  }
}


