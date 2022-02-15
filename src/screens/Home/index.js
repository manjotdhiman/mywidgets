import React, { useEffect, useRef } from 'react';
import { Button, View, FlatList, ActivityIndicator, Text,Animated, StyleSheet } from 'react-native';
import { PanResponder } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from '../../Constants/theme';
export default  ({ navigation }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  let firstProgressLayerStyle,percent = 10;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ]
      ),
      onPanResponderRelease: () => {
        console.log(pan);
        pan.flattenOffset();
      }
    })
  ).current;

  const renderThirdLayer = (percent) => {
    if(percent > 50){
      /**
      * Third layer circle default is 45 degrees, so by default it occupies the right half semicircle.
      * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
      * before passing to the propStyle function
      **/
      return <Animated.View style={[styles.secondProgressLayer,propStyle((percent - 50), 45) ]}>

      </Animated.View>
    }else{
      return <Animated.View style={styles.offsetLayer}></Animated.View>
    }
  }
  const propStyle = (percent, base_degrees) => {
    const rotateBy = base_degrees + (percent * 3.6);
    return {
      transform:[{rotateZ: `${rotateBy}deg`}]
    };
  }

  if(percent > 50){
      firstProgressLayerStyle = propStyle(50, -135);
  }else {
    firstProgressLayerStyle = propStyle(percent, -135);
  }
console.log(pan.x._value);
    return (
      <Animated.View style={{...styles.container2,
        transform: [{ translateX: pan.x }, { translateY: pan.y }]}}

      {...panResponder.panHandlers}
      >
        <Animated.View style={[styles.firstProgressLayer,firstProgressLayerStyle]} >
       

       

        </Animated.View>
        {renderThirdLayer(pan.y.interpolate({
  inputRange: [0, 400],
  outputRange: [0, 100],
  extrapolate: 'clamp'
}))}</Animated.View>
     
    
    );
}
const styles = StyleSheet.create({
  container2: {
    width: 200,
    height: 200,
    borderWidth: 20,
    borderRadius: 100,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center'
  },
  firstProgressLayer: {
    width: 200,
    height: 200,
    borderWidth: 20,
    borderRadius: 100,
    position: 'absolute',
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#3498db',
    borderTopColor: '#3498db',
    transform:[{rotateZ: '-135deg'}]
  },
  secondProgressLayer:{
    width: 200,
    height: 200,
    position: 'absolute',
    borderWidth: 20,
    borderRadius: 100,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#3498db',
    borderTopColor:'#3498db',
    transform: [{rotateZ: '45deg'}]
  },
  offsetLayer: {
    width: 200,
    height: 200,
    position: 'absolute',
    borderWidth: 20,
    borderRadius: 100,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'grey',
    borderTopColor: 'grey',
    transform:[{rotateZ: '-135deg'}]
  }
});
