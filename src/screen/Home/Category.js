import React from 'react';
import 'react-native-gesture-handler';
import { FlatList,View,SafeAreaView, Text, Image, Dimensions, StatusBar, AsyncStorage } from 'react-native';
const { height, width } = Dimensions.get('window');
import { CommonStyle } from '../../theme/style'
import * as colors from '../../theme/colors'
import {AdView} from '../../Ads/NativeAds';


export default class Category extends React.Component {
  
  constructor(props) {
    super(props);
    this.state={
        loader:true,
        data:[]
    }
  }

  async componentDidMount() {
    this.setState({
      data:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
      loader:false
    })
  }

  renderImage= ({ item, index }) => {
        return(
            <View style={{borderRadius:15,borderColor:'black',margin:5,borderWidth:1.5,padding:5}}>
                <Image 
                style={{height:200,width:110,tintColor:'black'}}
                source={require('../../Images/home.png')}/>
            </View>
        )
  }
  render() {
    return (
      <View style={{flex:1,backgroundColor:colors.white}}>
          <View style={{flex:1,padding:10}}>
           {this.state.loader ?   
           <View style={{flex:1,justifyContent:'center',alignSelf:'center'}}>
                
            </View>   
            :
            <View style={{flex:1}}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    renderItem={this.renderImage}
                    keyExtractor={item => item.id}
                    numColumns={3}
                  />
                   
            </View>
            }
          </View>
      </View>
    );
  }
}

