import React, { useEffect, useRef, useState } from 'react';
import { Button, View, FlatList, ActivityIndicator, Text, Animated, StyleSheet } from 'react-native';
import { PanResponder } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import _ from 'lodash';
import { Slider } from '@miblanchard/react-native-slider';
const SliderComp = ({ rotation }) => (
    <Slider
        step={1}

        style={styles.slider}
        minimumValue={0}
        maximumValue={10}
        minimumTrackTintColor="#6edbe6"
        maximumTrackTintColor="#FFFFFF"
        value={rotation._value}
        onValueChange={value => { console.log("setvalue:", value[0]); rotation.setValue(value[0]) }}
        thumbTintColor={"#fff"}
        trackStyle={{ height: 12, borderRadius: 5, }}
        thumbStyle={{ backgroundColor: "#6edbe6", borderWidth: 2, borderColor: "#fff", opacity: 1 }}

    />
)
export default ({ progress, bgColor, innerCircleColor, onChange }) => {
    const pan = useRef(new Animated.ValueXY()).current;
    const rotation = useRef(new Animated.Value(progress)).current;
    const offsetOpacity = useRef(new Animated.Value(1)).current;
    const secondProgressOpacity = useRef(new Animated.Value(0)).current;
    const [value, setValue] = useState(0);
    rotation.addListener((obj) => setOpacity(obj));
    useEffect(() => {
        rotation.setValue(progress)
    }, [progress])


    // pan.addListener((obj) => setOpacity(obj));
    const debouncedState = _.debounce(updateState, 50);
    function updateState(newValue) {
        setValue(newValue);
        onChange(newValue);
    }
    const setOpacity = (obj) => {
        console.log("anim", obj.value);


        if (obj.value > 5) {
            offsetOpacity.setValue(0);
            secondProgressOpacity.setValue(1);
            // console.log("in if", obj.y);

        } else {
            //  console.log("in else", obj.y);
            offsetOpacity.setValue(1);
            secondProgressOpacity.setValue(0);
        }
        debouncedState(obj.value);
    }



    console.log(pan.x._value, rotation._value);
    return (<View style={{ backgroundColor: bgColor, alignItems: "stretch", justifyContent: "center", width: 290, height: 350, padding: 20 }}>
        <Animated.View style={{
            ...styles.container2, backgroundColor: bgColor, borderColor: "#999", borderStyle: "dashed", marginBottom: 30,

        }}
        >
            <Animated.View style={{
                ...styles.firstProgressLayer,
                transform: [{
                    rotateZ: rotation.interpolate({
                        inputRange: [0, 10],
                        outputRange: ["-135deg", "225deg"],
                        extrapolate: "clamp",

                    })
                }]
            }} >
            </Animated.View>
            <Animated.View style={{
                ...styles.offsetLayer, borderRightColor: bgColor,
                borderTopColor: bgColor, opacity: offsetOpacity, transform: [{ rotateZ: '-135deg' }]
            }} >
            </Animated.View>
            <Animated.View style={{
                ...styles.secondProgressLayer, opacity: secondProgressOpacity, transform: [{ rotateZ: '45deg' }]
            }} >
            </Animated.View>

            <Animated.View style={{ width: 190, alignItems: "center", justifyContent: "center", height: 190, backgroundColor: innerCircleColor, borderRadius: 100, position: "absolute" }}>

            </Animated.View>
            <Animated.View style={{
                overflow: "hidden", width: 150, alignItems: "center", justifyContent: "center",
                height: 150, backgroundColor: "#b8eff4", borderRadius: 100, position: "absolute"
            }}>
                <Animated.View style={{ alignSelf: "center", position: "absolute", width: 130, height: 100, borderRadius: 50, backgroundColor: "#9de8f0" }}>
                </Animated.View>
                <Animated.View style={{ position: "absolute", width: 150, height: 70, borderRadius: 50, backgroundColor: "#6edbe6" }}>

                </Animated.View><Text style={{ color: "#fff", fontSize: 40, }}>{value}</Text>
            </Animated.View>
        </Animated.View>
        <SliderComp rotation={rotation} />
    </View>

    );
}
const styles = StyleSheet.create({
    container2: {
        width: 240,
        height: 240,
        borderWidth: 1,
        borderRadius: 1000,
        justifyContent: 'center',
        alignItems: 'center',


    },
    firstProgressLayer: {
        width: 200,
        height: 200,
        borderWidth: 5,
        borderRadius: 100,
        position: 'absolute',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: '#fff',
        borderTopColor: '#fff',
        transform: [{ rotateZ: '-135deg' }]
    },
    secondProgressLayer: {
        width: 200,
        height: 200,
        position: 'absolute',
        borderWidth: 5,
        borderRadius: 100,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: '#fff',
        borderTopColor: '#fff',
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

        transform: [{ rotateZ: '-135deg' }]
    },
    slider: { width: 200, height: 80, borderWidth: 2 }
});
