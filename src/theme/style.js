import { StyleSheet, Dimensions, Platform } from 'react-native';
const { height, width } = Dimensions.get('window');
import * as colors from './colors'
import DeviceInfo from 'react-native-device-info';
let isTablet = DeviceInfo.isTablet()
const CommonStyle = StyleSheet.create({


})

export { CommonStyle }
