/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import 'react-native-gesture-handler';
import React from 'react';
import MainStackNavigator from './src/navigation';
import {
  StatusBar,
  StyleSheet,
} from 'react-native';
import { colors } from './src/Constants/theme';


const App = () => {
  
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor={colors.secondaryColor} />
      <MainStackNavigator /></>
  );
};

export default App;
