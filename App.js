
import React, { useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,TransitionPresets } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './src/screen/Login'
import Registration from './src/screen/Signup'
import Splash from './src/screen/Splash'

import Home from './src/screen/Home'
import New from './src/screen/Home/New'
import Category from './src/screen/Home/Category'
import OpenImage from './src/screen/OpenImage'

import DCategory from './src/screen/Drawer/Category'
import ContactUs from './src/screen/Drawer/ContactUs'
import Download from './src/screen/Drawer/Download'
import Favorite from './src/screen/Drawer/Favorite'
import Privacy from './src/screen/Drawer/PrivacyPolicy'
import Setting from './src/screen/Drawer/Setting'
import Terms from './src/screen/Drawer/TermsService'
import Search from './src/screen/Search'

import DrawerContent from './src/component/DrawerContent'
import UserContext from './src/component/DrawerContext'
import * as colors from './src/theme/colors'
import { View ,Text,TouchableOpacity,Image,Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import DeviceInfo from 'react-native-device-info';
let isTablet = DeviceInfo.isTablet()
const { height, width } = Dimensions.get('window');
import { useDarkMode } from 'react-native-dark-mode';
function Component() {
  const isDarkMode = useDarkMode()
  if(isDarkMode)
  {
    global.DarkMode=true
  }
  else{
    global.DarkMode=false
  }
  return isDarkMode
}
const Drawer = createDrawerNavigator();

const HomeStack = createStackNavigator();
const NewStack = createStackNavigator();
const CategoryStack = createStackNavigator();
const DcategoryStack=createStackNavigator();
const DownloadStack=createStackNavigator();
const FavStack=createStackNavigator();
const SettingStack=createStackNavigator();
const ContactStack=createStackNavigator();
const TermStack=createStackNavigator();
const PrivacyStack=createStackNavigator();
const Tab = createBottomTabNavigator();
const AppStack = createStackNavigator();

const Menu = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        <Image style={{ marginLeft: 15, width:  20, height: 20,tintColor:Component()?'white':'black'}} source={require('./src/Images/menu.png')} />
      </TouchableOpacity>
    </View>
  );
}

function HomeStackScreen({ navigation }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" 
      options={{
        headerStyle: {
          backgroundColor: Component() ? 'black':'white',
        },
        headerTitleStyle: {color: Component() ? 'white':'black', alignSelf: "center", fontWeight: 'bold', fontSize: isTablet ? 30 : 22 },
        headerTitle: 'Trending',
        headerLeft: () => <Menu navigationProps={navigation} />,
        headerRight: () => (
          <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
            <Image style={{ marginRight: 10, width: isTablet ? 30 : 20, height: isTablet ? 30 : 20}} source={require('./src/Images/search.png')} />
          </TouchableOpacity>
        ),
      }} component={Home} />
     
    </HomeStack.Navigator>
  );
}

function NewStackScreen({ navigation }) {
  return (
    <NewStack.Navigator>
      <NewStack.Screen name="New" 
      options={{
        headerStyle: {
          backgroundColor: Component() ? 'black':'white',
        },
        headerTitleStyle: {color: Component() ? 'white':'black', alignSelf: "center", fontWeight: 'bold', fontSize: isTablet ? 30 : 22 },
        headerTitle: 'New',
        headerLeft: () => <Menu navigationProps={navigation} />,
        headerRight: () => (
          <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
            <Image style={{ marginRight: 10, width: isTablet ? 30 : 20, height: isTablet ? 30 : 20}} source={require('./src/Images/search.png')} />
          </TouchableOpacity>
        ),
      }} component={New} />
     
    </NewStack.Navigator>
  );
}

function CategoryStackScreen({ navigation }) {
  return (
    <CategoryStack.Navigator>
      <CategoryStack.Screen name="Category" 
      options={{
        headerStyle: {
          backgroundColor: Component() ? 'black':'white',
        },
        headerTitleStyle: {color: Component() ? 'white':'black', alignSelf: "center", fontWeight: 'bold', fontSize: isTablet ? 30 : 22 },
        headerTitle: 'Category',
        headerLeft: () => <Menu navigationProps={navigation} />,
        headerRight: () => (
          <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
            <Image style={{ marginRight: 10, width: isTablet ? 30 : 20, height: isTablet ? 30 : 20}} source={require('./src/Images/search.png')} />
          </TouchableOpacity>
        ),
      }} component={Category} />
     
    </CategoryStack.Navigator>
  );
}

function DcategoryStackScreen({ navigation }) {
  return (
    <DcategoryStack.Navigator>
      <DcategoryStack.Screen name="DCategory" 
      options={{
        headerStyle: {
          backgroundColor: Component() ? 'black':'white',
        },
        headerTitleStyle: {color: Component() ? 'white':'black', alignSelf: "center", fontWeight: 'bold', fontSize: isTablet ? 30 : 22 },
        headerTitle: 'Category',
        headerLeft: () => <Menu navigationProps={navigation} />,
        headerRight: () => (
         <Text/>
        ),
      }} component={DCategory} />
     
    </DcategoryStack.Navigator>
  );
}

function DownloadStackScreen({ navigation }) {
  return (
    <DownloadStack.Navigator>
      <DownloadStack.Screen name="Download" 
      options={{
        headerStyle: {
          backgroundColor: Component() ? 'black':'white',
        },
        headerTitleStyle: {color: Component() ? 'white':'black', alignSelf: "center", fontWeight: 'bold', fontSize: isTablet ? 30 : 22 },
        headerTitle: 'Downloads',
        headerLeft: () => <Menu navigationProps={navigation} />,
        headerRight: () => (
         <Text/>
        ),
      }} component={Download} />
     
    </DownloadStack.Navigator>
  );
}

function FavStackScreen({ navigation }) {
  return (
    <FavStack.Navigator>
      <FavStack.Screen name="Favorite" 
      options={{
        headerStyle: {
          backgroundColor: Component() ? 'black':'white',
        },
        headerTitleStyle: {color: Component() ? 'white':'black', alignSelf: "center", fontWeight: 'bold', fontSize: isTablet ? 30 : 22 },
        headerTitle: 'Favorite',
        headerLeft: () => <Menu navigationProps={navigation} />,
        headerRight: () => (
         <Text/>
        ),
      }} component={Favorite} />
     
    </FavStack.Navigator>
  );
}

function SettingStackScreen({ navigation }) {

  return (
    <SettingStack.Navigator>
      <SettingStack.Screen name="Setting" 
      options={{
        headerStyle: {
          backgroundColor: Component() ? 'black':'white',
        },
        headerTitleStyle: { color: Component() ? 'white':'black',alignSelf: "center", fontWeight: 'bold', fontSize: isTablet ? 30 : 22 },
        headerTitle: 'Settings',
        headerLeft: () => <Menu navigationProps={navigation} />,
        headerRight: () => (
         <Text/>
        ),
      }} component={Setting} />
     
    </SettingStack.Navigator>
  );
}

function ContactStackScreen({ navigation }) {
  return (
    <ContactStack.Navigator>
      <ContactStack.Screen name="ContactUs" 
      options={{
        headerStyle: {
          backgroundColor: Component() ? 'black':'white',
        },
        headerTitleStyle: {color: Component() ? 'white':'black', alignSelf: "center", fontWeight: 'bold', fontSize: isTablet ? 30 : 22 },
        headerTitle: 'Contact Us',
        headerLeft: () => <Menu navigationProps={navigation} />,
        headerRight: () => (
         <Text/>
        ),
      }} component={ContactUs} />
     
    </ContactStack.Navigator>
  );
}

function TermStackScreen({ navigation }) {
  return (
    <TermStack.Navigator>
      <TermStack.Screen name="Terms" 
      options={{
        headerStyle: {
          backgroundColor: Component() ? 'black':'white',
        },
        headerTitleStyle: { color: Component() ? 'white':'black',alignSelf: "center", fontWeight: 'bold', fontSize: isTablet ? 30 : 22 },
        headerTitle: 'Terms Of Service',
        headerLeft: () => <Menu navigationProps={navigation} />,
        headerRight: () => (
         <Text/>
        ),
      }} component={Terms} />
     
    </TermStack.Navigator>
  );
}
function PrivacyStackScreen({ navigation }) {
  return (
    <PrivacyStack.Navigator>
      <PrivacyStack.Screen name="Privacy" 
      options={{
        headerStyle: {
          backgroundColor: Component() ? 'black':'white',
        },
        headerTitleStyle: {color: Component() ? 'white':'black', alignSelf: "center", fontWeight: 'bold', fontSize: isTablet ? 30 : 22 },
        headerTitle: 'Privacy',
        headerLeft: () => <Menu navigationProps={navigation} />,
        headerRight: () => (
         <Text/>
        ),
      }} component={Privacy} />
     
    </PrivacyStack.Navigator>
  );
}

function BottomTab({ navigation, route }) {
  // AsyncStorage.setItem("key", route.key)

  return (
    <Tab.Navigator
      tabBarOptions={{
        labelPosition: 'below-icon',
        tabStyle: { marginVertical: 3, },
        style: { backgroundColor: Component() ? 'black': colors.blue, minHeight: isTablet ? height / 15 : height / 13 }
      }} >
      <Tab.Screen name="Home" component={HomeStackScreen} options={{
        tabBarLabel: ({ focused }) => 
          <View style={{borderBottomWidth:focused ? 1:0,borderBottomColor:'white',paddingBottom:5}}>
          <Text style={{ textAlign:'center',color: focused ? 'white' : Component()?'gray':'white', fontSize: isTablet ? 17 : 12 }}>Trending</Text>
          </View>,
        tabBarIcon: ({ focused }) => (
          <Image style={{  width:  20, height: 20,tintColor:focused ? 'white' : Component()?'gray':'white'}} source={require('./src/Images/trending.png')} />
          ),
          
      }} />
      <Tab.Screen name="New" component={NewStackScreen} options={{
        tabBarLabel: ({ focused }) => 
        <View style={{borderBottomWidth:focused ? 1:0,borderBottomColor:'white',paddingBottom:5}}>
        <Text style={{ textAlign:'center',color: focused ? 'white' : Component()?'gray':'white', fontSize: isTablet ? 17 : 12 }}>New</Text>
        </View>,
        tabBarIcon: ({ focused }) => (
          <Image style={{width:  20, height: 20,tintColor:focused ? 'white' : Component()?'gray':'white'}} source={require('./src/Images/new.png')} />
       ),
      }} />
      {/* <Tab.Screen name="Category" component={CategoryStackScreen} options={{
         tabBarLabel: ({ focused }) => 
         <View style={{borderBottomWidth:focused ? 1:0,borderBottomColor:'white',paddingBottom:5}}>
         <Text style={{ textAlign:'center',color: focused ? 'white' : Component()?'gray':'white', fontSize: isTablet ? 17 : 12 }}>Category</Text>
         </View>,
        tabBarIcon: ({ focused }) => (
          <Image style={{ width:  20, height: 20,tintColor:focused ? 'white' : Component()?'gray':'white'}} source={require('./src/Images/grid.png')} />
          ),
      }} /> */}
     
    </Tab.Navigator>
  );
}

function App() {
    return (
      <NavigationContainer>
        <AppStack.Navigator 
          screenOptions={{ 
            headerShown: false ,
            gestureEnabled:true,
            gestureDirection:'horizontal',
            ...TransitionPresets.SlideFromRightIOS
          }}
          headerMode='screen'
          initialRouteName={'Splash'} >
          <AppStack.Screen name="Splash" options={{ gestureEnabled:false,headerShown:false }} component={Splash} />
          <AppStack.Screen name="Login" component={Login} options={{gestureEnabled: false,headerShown:false}}/>
          <AppStack.Screen name="Registration" options={{ gestureEnabled:false,headerShown:false }} component={Registration} />
          {/* <AppStack.Screen name="Home" options={{ gestureEnabled:false,headerShown:false }} component={HomeStackScreen} /> */}
          <AppStack.Screen name="Home" options={{ gestureEnabled: false }} component={() => (
                  <Drawer.Navigator edgeWidth={0}
                    drawerContent={(props) => <DrawerContent {...props} />}
                    drawerType='slide'
                    drawerStyle={{ width: width-100 }}
                    drawerContentOptions={{
                      activeTintColor: '#e91e63',
                      itemStyle: { marginVertical: 5 },
                    }}
                  >
                    <Drawer.Screen name="Home" component={BottomTab} />
                    <Drawer.Screen name="DCategory"  component={DcategoryStackScreen} />
                    <Drawer.Screen name="ContactUs" component={ContactStackScreen} />
                    <Drawer.Screen name="Download" component={DownloadStackScreen} />
                    <Drawer.Screen name="Favorite" component={FavStackScreen} />
                    <Drawer.Screen name="Privacy" component={PrivacyStackScreen} />
                    <Drawer.Screen name="Setting" component={SettingStackScreen} />
                    <Drawer.Screen name="Terms" component={TermStackScreen} />
       
                  </Drawer.Navigator>
                )} />
              <AppStack.Screen name="Search" options={{ gestureEnabled:false,headerShown:false }} component={Search} />
              <AppStack.Screen name="OpenImage" options={{gestureEnabled:false,headerShown:false}} component={OpenImage}/>

        </AppStack.Navigator>
    </NavigationContainer>
    );
  }
  
export default App;
