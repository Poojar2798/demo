import React from 'react';
import 'react-native-gesture-handler';
import {ActivityIndicator, FlatList,View,SafeAreaView,TouchableOpacity, Text, Image, Dimensions, StatusBar, AsyncStorage } from 'react-native';
const { height, width } = Dimensions.get('window');
import { CommonStyle } from '../../theme/style'
import * as colors from '../../theme/colors'
import {AdView} from '../../Ads/NativeAds';

export default class Download extends React.Component {
  
  constructor(props) {
    super(props);
    this.state={
        loader:true,
        data:[]
    }
  }

  async componentDidMount() {
   
    this.setImageList()
  }

  setImageList(){
  
      fetch('https://picsum.photos/v2/list', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then((response) => response.json())
      .then(responseJson => {
        console.log("====home resp img");
        this.setState({
          data:responseJson,
          loader:false
        })
        console.log(responseJson)
      })
      .catch(err => {
        console.log(err)
      })
  }

  renderImage= ({ item, index }) => {
    console.log("====home img");
    console.log(item)
    let url=null
    url=item.download_url
        return(
            <View style={{borderRadius:15,borderColor:'black',margin:9,borderWidth:1.5,}}>
                {url!=null ? 
                  // <TouchableOpacity onPress={()=>this.props.navigation.navigate('OpenImage',{ItemImage:item})}>
                    <Image 
                    style={{height:200,width:110,borderRadius:14,}}
                    source={{uri:url}}/>
                  // </TouchableOpacity>
                : 
                  <View style={{ height:200,width:110,justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="small" color={colors.blue} style={{ marginLeft: 10, width: 10, height: 10 }} />
                  </View>
                }
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

