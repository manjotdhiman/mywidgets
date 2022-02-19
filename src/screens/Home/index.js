import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text, Animated, StyleSheet } from 'react-native';
import { PanResponder } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import Knob from '../../Components/Knob';
import Button from "../../Components/Button";
import styles from './styles';
export default ({ navigation }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const offsetOpacity = useRef(new Animated.Value(1)).current;
  const secondProgressOpacity = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(0);
const onChange =(value) =>{
  console.log("value from knob:",value);
  setProgress(value);
}
  return (
    <View style={styles.container} >
      <Text style={styles.text} >Select component which you want to see</Text>
      <Button onPress={()=>navigation.navigate("KnobScreen")} title="Knob Screen" />
      <Button onPress={()=>navigation.navigate("PyramidScreen")} title="Pyramid Screen" />
    </View>

  );
}

