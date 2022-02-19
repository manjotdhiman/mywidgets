import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Knob from '../../Components/Knob';
import styles from './styles';
export default ({ navigation }) => {
 
  const [progress, setProgress] = useState(0);
const onChange =(value) =>{
  console.log("value from knob:",value);
  setProgress(value);
}
  return (
    <View style={styles.container} >
      <Text style={styles.text} >Pick the level your anger & frustation right now</Text>
      <View  style={styles.knobContainer}>
    <Knob progress={progress} onChange={onChange} bgColor="#325d6f" innerCircleColor={"#456d7c"} />
    </View>
    
    </View>

  );
}

