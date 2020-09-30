import React from 'react';
import 'react-native-gesture-handler';
import {NativeModules,PermissionsAndroid,TouchableOpacity,Share,FlatList,View,SafeAreaView, Text, Image, Dimensions, StatusBar, AsyncStorage, ImageBackground, Platform, Modal } from 'react-native';
const { height, width } = Dimensions.get('window');
import { CommonStyle } from '../theme/style'
import * as colors from '../theme/colors'
import RNFetchBlob from 'rn-fetch-blob';
import {AdView} from '../Ads/NativeAds';
import WallPaperManager from 'react-native-wallpaper-manager';
const fs = RNFetchBlob.fs;
let imagePath = null;

export default class OpenImage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state={
        loader:false,
        fav:false,
        previewTypeModal:false
       }
  }

  async componentDidMount() {
    
  }

  onPressFav(flag){
    if( global.UserInfo!=null)
    {
      if(flag){
          this.setState({fav:false})
      }
      else if(!flag){
        this.setState({fav:true})
      }
    } else{
      alert("please Login")
    }  
  }

  imageThumbnail(){
      return(
          <Image
            source={{uri:this.props.route.params.ItemImage.download_url}}
            style={{height:40,width:40}}
          />
      )
  }

  onPressShare(){
    // let msg
    // RNFetchBlob.config({
    //     fileCache: true
    //   })
    //     .fetch("GET", this.props.route.params.ItemImage.download_url)
    //     .then(resp => {
    //     //   alert(JSON.stringify(resp))
    //       imagePath = resp.path();
    //       return resp.readFile("base64");
    //     })
    //     .then(base64Data => {
    //       msg=base64Data
    //     //   console.log(base64Data);
    //       return fs.unlink(imagePath);
    //     });

        let shareImage = {
            title:'Image Sharing',
            message:'Image Sharing From PhotoBI\n\n'+this.imageThumbnail()+'\n\n'+this.props.route.params.ItemImage.download_url,
            //message:"data:jpg/jpeg;base64,"+msg,
            url:this.props.route.params.ItemImage.download_url,
        };
        Share.share(shareImage)
        .then(result =>{
            console.log("====shareImage")
            console.log(result)
        })
        .catch(errorMsg => console.log(errorMsg));
  }
  
 async onpressDownload(){

    if( global.UserInfo!=null)
    {
      if (Platform.OS === 'ios') {
          this.downloadImage();
        } else {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              {
                title: 'Storage Permission Required',
                message: 'This app needs access to your storage to download Photos',
              }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('Storage Permission Granted.');
              this.downloadImage();
            } else {
              alert('Storage Permission Not Granted');
            }
          } catch (err) {
            console.warn(err);
          }
        }
    }
    else{
      alert("please Login")
    }  
  }

  downloadImage(){
    let date = new Date(); //To add the time suffix in filename
    let image_URL =this.props.route.params.ItemImage.download_url;
    let ext = this.getExtention(image_URL);
    ext = '.' + ext[0];
  
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        console.log('res -> ', JSON.stringify(res));
        console.log('Image Downloaded Successfully.');
      });
  };

  getExtention = (filename) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  onpressWallpap(){
    this.setState({previewTypeModal:false})
    
    WallPaperManager.setWallPaper(
      {uri:this.props.route.params.ItemImage.download_url}, 
      (res)=> console.log(res));
  }

  render() {
    return (
      <View style={{flex:1}}>
         
           {this.state.loader ?   
            <View style={{flex:1,justifyContent:'center',alignSelf:'center'}}>
                
            </View>   
            :
            <ImageBackground 
                source={{uri:this.props.route.params.ItemImage.download_url}}
                style={{height:'100%',width:'100%',backgroundColor:'black'}}
            >

            <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                <TouchableOpacity 
                    onPress={()=>this.props.navigation.goBack()}
                    style={{marginTop:40,marginLeft:20}}>
                    <Image
                        source={require('../Images/home.png')}
                        style={{height:25,width:25,tintColor:'white'}}
                    />
                </TouchableOpacity>
          
                <TouchableOpacity 
                    activeOpacity={0.9}
                    onPress={()=>this.onPressShare()}
                    style={{marginTop:40,marginRight:20}}>
                    <Image
                        source={require('../Images/share.png')}
                        style={{height:25,width:25,tintColor:'white'}}
                    />
                </TouchableOpacity>
            </View>

            <View style={{width:'100%',justifyContent:'space-between',flexDirection:'row',position:'absolute',bottom:60}}>
                <TouchableOpacity 
                    activeOpacity={0.9}
                    onPress={()=>this.setState({previewTypeModal:true})}
                    style={{alignSelf:'center',marginLeft:80,backgroundColor:'white',borderRadius:20,padding:8}}>
                    <Image
                        source={require('../Images/preview.png')}
                        style={{height:25,width:25,tintColor:'black'}}
                    />
                </TouchableOpacity>

                <TouchableOpacity 
                    activeOpacity={0.9}
                    onPress={()=>this.onpressDownload()}
                    style={{backgroundColor:'white',borderRadius:30,padding:15}}>
        
                    <Image
                        source={require('../Images/download_1.png')}
                        style={{height:25,width:25,tintColor:'black'}}
                    />
                </TouchableOpacity>
          
                <TouchableOpacity 
                    activeOpacity={0.9}
                    onPress={()=>this.onPressFav(this.state.fav)}
                    style={{alignSelf:'center',marginRight:80,backgroundColor:'white',borderRadius:20,padding:8}}>
                    <Image
                        source={
                            this.state.fav
                            ?
                            require('../Images/star_yel.png')
                            :
                            require('../Images/star_blank.png')}
                        style={{height:25,width:25,}}
                    />
                </TouchableOpacity>
               
            </View>
            </ImageBackground>
            }

            <Modal
              visible={this.state.previewTypeModal}
              transparent={true}
              onRequestClose={()=>this.setState({previewTypeModal:false})}
              >
              <View style={{marginLeft:65,paddingTop:15,paddingBottom:15,paddingLeft:5,paddingRight:5,position:'absolute',bottom:110,backgroundColor:'white',borderRadius:55}}>
                  <Text style={{marginBottom:15,alignSelf:'center'}}>Preview</Text>
                  <TouchableOpacity onPress={()=>this.onpressWallpap()}>
                    <Image
                          source={require('../Images/star_blank.png')}
                          style={{height:25,width:25,alignSelf:'center'}}
                      />
                    <Text style={{alignSelf:'center',marginBottom:10}}>Wallpaper</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>this.setState({previewTypeModal:false})}>
                    <Image
                          source={require('../Images/star_blank.png')}
                          style={{height:25,width:25,alignSelf:'center'}}
                      />
                    <Text style={{alignSelf:'center',marginBottom:5,textAlign:'center'}}>Lock{`\n`}Screen</Text>
                  </TouchableOpacity>
              </View>
            </Modal>
         
      </View>
    );
  }
}

