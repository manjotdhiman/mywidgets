import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Pyramid from '../../Components/Pyramid';
import styles from './styles';
export default ({ navigation }) => {

  const [progress, setProgress] = useState(3);
  const onChange = (value) => {
    console.log("value from knob:", value);
    setProgress(value);
  }
  return (
    <View style={styles.container} >
      <Text style={styles.text} >Pick the level your anger & frustation right now</Text>
      <View style={styles.knobContainer}>
        <Pyramid progress={progress} onChange={onChange} bgColor="#325d6f" innerCircleColor={"#456d7c"} />
      </View>
      <Text style={styles.text} >Pan Gesture can also be used to make it easy for user to adjust the value </Text>
    </View>

  );
}

