import React, { useEffect, useRef } from 'react';
import { Button, View, FlatList, ActivityIndicator, Text, Animated, StyleSheet } from 'react-native';
import { PanResponder } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { colors } from '../../Constants/theme';
export default ({ navigation }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const offsetOpacity = useRef(new Animated.Value(0)).current;
  const startAngle = 0;
  const endAngle = 360;
  let pts;


 const getDeg = (cX, cY, pts) => {
    const x = cX - pts.x;
    const y = cY - pts.y;
    let deg = Math.atan(y / x) * 180 / Math.PI;
    if ((x < 0 && y >= 0) || (x < 0 && y < 0)) {
      deg += 90;
    } else {
      deg += 270;
    }
    let finalDeg = Math.min(Math.max(startAngle, deg), endAngle);
    return finalDeg;
  };

  pan.addListener((obj) => setOpacity(obj));
  const setOpacity = (obj) => {
    //console.log("anim", obj.y);
    let degg = getDeg(obj.x,obj.y,pts);
    console.log("deg:",degg);
    rotation.setValue(degg);
     if (degg > 180) {
      offsetOpacity.setValue(0);
     // console.log("in if", obj.y);

    } else {
    //  console.log("in else", obj.y);
      offsetOpacity.setValue(1);
    }
  }
  let firstProgressLayerStyle, percent = 10;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
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
    if (percent > 50) {
      /**
      * Third layer circle default is 45 degrees, so by default it occupies the right half semicircle.
      * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
      * before passing to the propStyle function
      **/
      return <Animated.View style={[styles.secondProgressLayer, propStyle((percent - 50), 45)]}>

      </Animated.View>
    } else {
      return <Animated.View style={styles.offsetLayer}></Animated.View>
    }
  }
  const propStyle = (percent, base_degrees) => {
    console.log("percent:", percent);
    const rotateBy = base_degrees + (percent * 3.6);
    return {
      transform: [{ rotateZ: `${rotateBy}deg` }]
    };
  }

  if (percent > 50) {
    firstProgressLayerStyle = propStyle(50, -135);
  } else {
    firstProgressLayerStyle = propStyle(percent, -135);
  }
  console.log(pan.x._value);
  return (
    <Animated.View style={{
      ...styles.container2,
      //  transform: [{ rotateZ: pan.x.interpolate({
      //   inputRange: [0, 700],
      //   outputRange: ["0deg", "360deg"]
      // }) }]
    }}
onLayout={event =>{
  const layout = event.nativeEvent.layout;
  pts = {
    x: layout.x + layout.width / 2,
    y: layout.y + layout.height / 2
  };

  // console.log('height:', layout.height);
  // console.log('width:', layout.width);
  // console.log('x:', layout.x);
  // console.log('y:', layout.y);
}}
      {...panResponder.panHandlers}
    >
      <Animated.View style={{
        ...styles.firstProgressLayer,
        transform: [{
          rotateZ: rotation.interpolate({
            inputRange: [0, 360],
            outputRange: ["-135deg", "360deg"],
            extrapolate: "clamp"
          })
        }]
      }} >
      </Animated.View>
      <Animated.View style={{
        ...styles.offsetLayer, opacity: offsetOpacity, transform: [{ rotateZ: '-135deg' }]
      }} >
      </Animated.View>
      <Animated.View style={{
        ...styles.secondProgressLayer, opacity: offsetOpacity == 0  ?1:0, transform: [{ rotateZ: '45deg' }]
      }} >
      </Animated.View>
    </Animated.View>


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
    alignItems: 'center',
    left:100
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
    transform: [{ rotateZ: '-135deg' }]
  },
  secondProgressLayer: {
    width: 200,
    height: 200,
    position: 'absolute',
    borderWidth: 20,
    borderRadius: 100,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#3498db',
    borderTopColor: '#3498db',
    transform: [{ rotateZ: '45deg' }]
  },
  offsetLayer: {
    width: 200,
    height: 200,
    position: 'absolute',
    borderWidth: 20,
    borderRadius: 100,
    borderLeftColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'green',
    borderTopColor: 'green',
    transform: [{ rotateZ: '-135deg' }]
  }
});
