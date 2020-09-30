import React from 'react';
import 'react-native-gesture-handler';
import { Platform, UIManager, LayoutAnimation, SafeAreaView, Alert, Text, View, Button, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import * as colors from "../theme/colors";
const { height, width } = Dimensions.get('window');
import DeviceInfo from 'react-native-device-info';
import { DrawerActions } from '@react-navigation/native';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import UserContext from "../component/DrawerContext";
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';
let isTablet = DeviceInfo.isTablet()
global.currentScreenIndex = 0
global.UserInfo=null

export default class DrawerContent extends React.Component {
  static contextType = UserContext

  constructor(props) {
    super(props)
    this.state = {
      orientation: '',
      UserName:'',
      ProfileImg:'',
      userInfo: null,
      gettingLoginStatus: true,
      NavigationList: [
        {
          navIcon:require('../Images/home.png'),
          navOptionTitle: 'Home',
          screenToNavigate: 'Home',
         
        },
        {
          navIcon:require('../Images/download_1.png'),
          navOptionTitle: 'Download',
          screenToNavigate: 'Download',
         
        },
        {
          navIcon:require('../Images/star.png'),
          navOptionTitle: 'Favorite',
          screenToNavigate: 'Favorite',
         
        },
        // {
        //   navIcon:require('../Images/grid.png'),
        //   navOptionTitle: 'Category',
        //   screenToNavigate: 'DCategory',
         
        // },
        {
          navIcon:require('../Images/gear.png'),
          navOptionTitle:'Settings',
          screenToNavigate:'Setting',
         
        },
        {
          navIcon:require('../Images/contact.png'),
          navOptionTitle: 'Contact Us',
          screenToNavigate: 'ContactUs',
        },
        {
          navIcon:require('../Images/accept.png'),
          navOptionTitle: 'Terms Of Service',
          screenToNavigate: 'Terms',
        },
        {
          navIcon:require('../Images/shield.png'),
          navOptionTitle: 'Privacy Policy',
          screenToNavigate: 'Privacy',
        },

      ]
    }
  }
  async componentDidMount() {

    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId: '263984093070-t9giro17b49hvup2hinig351d1q805mf.apps.googleusercontent.com',
    });
    this._isSignedIn();

  }
  
  _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      // alert('User is already signed in');
      this._getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    this.setState({ gettingLoginStatus: false });
  };

  _getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('User Info --> ', userInfo);
      global.UserInfo=userInfo
      this.setState({
        userInfo: userInfo,
        UserName:userInfo.user.name,
       ProfileImg:userInfo.user.photo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        // alert("Something went wrong. Unable to get user's info");
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  };

  _signIn = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
       
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      global.UserInfo=userInfo
      this.setState({
         userInfo: userInfo,
         UserName:userInfo.user.name,
        ProfileImg:userInfo.user.photo });
      
    } catch (error) {
      console.log('error Message:',error);
    }
  };

  _signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      global.UserInfo=null
      this.setState({
        userInfo:null,
        UserName:'',
        ProfileImg:'' }); 
    } catch (error) {
      console.error(error);
    }
  };

  async navigationWithPush(item, key) {
    try {
      console.log('item navvvvvvvvvvvv : ', item)
      if((this.state.userInfo==null && item.screenToNavigate=="Favorite") || (this.state.userInfo==null && item.screenToNavigate=="Download") )
      {
        alert("please Login")
      }
      else{
        this.props.navigation.navigate(item.screenToNavigate);
      }
      // this.props.navigation.closeDrawer();
    }
    catch (exception) {
      console.log('catch : ', exception)
    }
  };

  

  render() {
   
    return (
      <View ref="rootView" style={[styles.Maincontainer,{backgroundColor: global.DarkMode ? colors.black : colors.white,borderWidth:2,borderColor:global.DarkMode ? colors.white : colors.white}]}>
        <View style={[styles.HeaderView, { marginLeft: this.state.orientation == 'landscape' ? 10 : 0, alignItems: 'center', paddingLeft: 15, paddingRight: 18 }]}>
        <TouchableOpacity>
          <Image 
            style={styles.logoImg} 
            resizeMode="contain" 
            source={
              this.state.ProfileImg!=''
              ?
              { uri: this.state.ProfileImg}
              :
              require('../Images/user.png')} />
        </TouchableOpacity>  
        
        <View style={{marginLeft:5,height:80,alignSelf:'center',justifyContent:'center'}}>
        {this.state.UserName!='' ? 
        <Text style={styles.DrawerItemTxt,{fontWeight:'bold',marginLeft:7,color:global.DarkMode ? colors.white : colors.black}}>{this.state.UserName}</Text>
        :undefined}
        {this.state.userInfo == null ?
         <View style={{justifyContent:'center',alignSelf:'center',marginBottom:5}}>
          <GoogleSigninButton
            style={{ width:200, height:38,}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Light}
            onPress={this._signIn}
          />
        </View>
          :undefined}
        </View>
        </View>
        <View style={[styles.View1,{ backgroundColor: global.DarkMode ? colors.white : colors.black,}]} />
        <ScrollView style={{ marginBottom: 80,}} showsVerticalScrollIndicator={false}>
          {this.state.NavigationList.map((item, key) => (
            <View style={{ marginLeft: this.state.orientation == 'landscape' ? 20 : 0,}}>
              <View style={styles.BodyView}>
                <TouchableOpacity onPress={() => {
                  this.navigationWithPush(item, key)
                }}>
                  <View style={styles.DrawerItemView}>
                    <Image style={[styles.DrawerItemImg,{tintColor:global.DarkMode ? colors.white : colors.black}]} resizeMode="contain" source={item.navIcon} />
                    <Text style={[styles.DrawerItemTxt, { color: global.DarkMode ? colors.white : colors.black }]}>
                      {item.navOptionTitle}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          ))}
           <View style={{ marginLeft: this.state.orientation == 'landscape' ? 20 : 0,}}>
              <View style={styles.BodyView}>
                <TouchableOpacity onPress={() => {this._signOut()}}>
                  <View style={styles.DrawerItemView}>
                    <Image style={[styles.DrawerItemImg,{tintColor:global.DarkMode ? colors.white : colors.black}]} resizeMode="contain" source={require('../Images/logout.png')} />
                    <Text style={[styles.DrawerItemTxt, { color: global.DarkMode ? colors.white : colors.black }]}>
                      LogOut
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
        </ScrollView>
        {/* <View style={[styles.BottomView, { marginLeft: this.state.orientation == 'landscape' ? 20 : 0, }]}>
          <TouchableOpacity onPress={() =>
            this.props.navigation.navigate('ContactUs')
          }>
            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
            </View>
          </TouchableOpacity>
        </View> */}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  Maincontainer: {
    flex: 1,
    
  },
  HeaderView: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    marginTop: (Platform.OS == 'android') ? 5 : 25,
   // justifyContent: 'space-between'
  },
  logoImg: {
    height: isTablet ? 80 : 70,
    width: isTablet ? 80 : 70,
    // borderRadius:isTablet ? 80/2 : 70/2,
    // borderColor:'black',
    // borderWidth:1.5,
    
  },
  cancelImg: {
    alignItems: 'center',
    marginLeft:25
  },
  View1: {
    marginTop: 5,
    height: 1.5,
   
    marginBottom: 15
  },
  BodyView: {
    padding: isTablet ? 28 : 18,
    flexDirection: 'row'
  },
  DrawerItemView: {
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  DrawerItemImg: {
    height: isTablet ? 35 : 20,
    width: isTablet ? 35 : 20,
    alignSelf: 'center',
    
  },
  DrawerItemTxt: {
    alignSelf: 'center',
    marginLeft: isTablet ? 25 : 10,
    fontSize: isTablet ? 26 : 18,
    
  },
  DropdownView: {
    marginLeft: 10,
    alignContent: 'center',
    paddingTop: isTablet ? 9 : 5
  },
  DropdownImg: {
    marginLeft: 10,
    height: isTablet ? 20 : 14,
    width: isTablet ? 24 : 14,
    tintColor: colors.black
  },
 
  BottomView: {
    backgroundColor:colors.grey,
    position: 'absolute',
    bottom: 10,
    borderRadius:10,
    width: '95%',
    height:'10%',
    margin:10,
    alignSelf:'center'
  }

})