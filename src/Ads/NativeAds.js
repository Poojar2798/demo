//native ads and video
import React, {useState} from 'react';
import {Platform, View, Dimensions} from 'react-native';
import NativeAdView,{
  AdvertiserView,
  CallToActionView,
  HeadlineView,
  IconView,
  StarRatingView,
  TaglineView,
  MediaView,
  StoreView,
} from 'react-native-admob-native-ads';
import Adskey from '../const/const'; 
const NATIVE_AD_ID =
  Platform.OS === 'ios'
    ? Adskey.ios_Native_Advanced
    : Adskey.and_Native_Advanced;

const NATIVE_AD_VIDEO_ID =
  Platform.OS === 'ios'
    ? Adskey.ios_Native_Advanced_Video
    : Adskey.and_Native_Advanced_Video;

const BANNER_AD =
  Platform.OS === 'ios'
    ? Adskey.ios_Banner
    : Adskey.and_Banner;


export const AdView = ({media, type,delay=0}) => {
  const [aspectRatio, setAspectRatio] = useState(1);
  const [adLoaded, setAdLoaded] = useState(false);
  const _onAdFailedToLoad = (event) => {
    console.log(event.nativeEvent);
    setAdLoaded(false);
  };

  const _onAdLoaded = () => {
    console.log('Ad has loaded successfully');
  };

  const _onAdClicked = () => {
    console.log('User has clicked the ad');
  };

  const _onAdImpression = () => {
    console.log('Ad impressionr recorded');
  };

  const _onUnifiedNativeAdLoaded = (event) => {
    console.log(event);
    console.log('Views have populated with the Ad');
    console.log(event.aspectRatio);
    setAdLoaded(true);
    setAspectRatio(event.aspectRatio);
  };

  return (
    <NativeAdView
      onAdLoaded={_onAdLoaded}
      onAdFailedToLoad={_onAdFailedToLoad}
      onAdLeftApplication={() => {
        console.log('ad has left the application');
      }}
      delayAdLoading={delay}
      onAdClicked={_onAdClicked}
      onAdImpression={_onAdImpression}
      onUnifiedNativeAdLoaded={_onUnifiedNativeAdLoaded}
      refreshInterval={60000 * 2}
      style={{
        width: '98%',
        alignSelf: 'center',
        marginVertical: 10,
      }}
      adUnitID={
        type==='banner' ? BANNER_AD
        :
        type === 'image' ? NATIVE_AD_ID : NATIVE_AD_VIDEO_ID} // REPLACE WITH NATIVE_AD_VIDEO_ID for video ads.
    >
      <View
        style={{
          width: '100%',
        }}>
       
            <View
              style={{
                height: 100,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <IconView
                style={{
                  width: 60,
                  height: 60,
                }}
              />
              <View
                style={{
                  width: '60%',
                  maxWidth: '60%',
                  paddingHorizontal: 6,
                }}>
                <HeadlineView
                  hello="abc"
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                  }}
                />
                <TaglineView
                  numberOfLines={2}
                  style={{
                    fontSize: 11,
                  }}
                />
                <AdvertiserView
                  style={{
                    fontSize: 10,
                    color: 'gray',
                  }}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <StarRatingView
                    starSize={12}
                    fullStarColor="orange"
                    emptyStarColor="gray"
                    containerStyle={{
                      width: 65,
                      marginTop: 4,
                    }}
                  />

                  <StoreView
                    style={{
                      fontSize: 12,
                      marginLeft: 10,
                    }}
                  />
                </View>
              </View>
              <CallToActionView
                style={{
                  height: 45,
                  paddingHorizontal: 12,
                  backgroundColor: 'gray',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  elevation: 10,
                }}
                textStyle={{color: 'white', fontSize: 14}}
              />
            </View>
        {media ? (
          <MediaView
            style={{
              width: Dimensions.get('window').width - 20,
              height: Dimensions.get('window').width / aspectRatio,
              backgroundColor: 'white',
            }}
          />
        ) : null}
      </View>
    </NativeAdView>
  );
};


