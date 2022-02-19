import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TapGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import _ from 'lodash';

export default ({ progress, bgColor, onChange }) => {
    const [value, setValue] = useState([
        { key: 5, width: 250, enabled: false },
        { key: 4, width: 200, enabled: false },
        { key: 3, width: 150, enabled: true },
        { key: 2, width: 100, enabled: true },
        { key: 1, width: 50, enabled: true }
    ]);


    useEffect(() => {
        setValue(oldval => oldval.map(o => { if (o.key <= progress) { o.enabled = true; return o; } 
        else { o.enabled = false; return o; } }));
   
    }, [progress])

    const debouncedState = _.debounce(updateState, 50);
    function updateState(newValue) {

        setValue(oldval => oldval.map(o => { if (o.key <= newValue) { o.enabled = true; return o; } else { o.enabled = false; return o; } }));
        onChange(newValue);
    }
    const singleTap = (event, id) => {

        debouncedState(id);

    }
    const Trape = ({ width, enabled, id }) => (
        <TapGestureHandler onHandlerStateChange={(event) => singleTap(event, id)} ><View style={{
            ...styles.trape2, width: width, alignSelf: "center",
            backgroundColor: enabled ? "#fff" : "#819da7", transform: [{ rotateX: '-20deg' }, { perspective: 60 }]
        }} >

        </View></TapGestureHandler>);

    return (<GestureHandlerRootView><View style={styles.contain}>
        <Text style={styles.text}>{progress < 3 ? "Low" : progress == 3 ? "Medium" : "High"}</Text>
        {value.map(o => (
            <Trape key={o.key} id={o.key} width={o.width} enabled={o.enabled} />
        ))

        }

    </View></GestureHandlerRootView>

    );
}
const styles = StyleSheet.create({
    contain: {
        alignItems: "center",  alignItems: "stretch",
        justifyContent: "center", width: 290, height: 350, padding: 20
    },
    container2: {
        width: 240,
        height: 240,
        borderWidth: 1,
        borderRadius: 1000,
        justifyContent: 'center',
        alignItems: 'center',


    },
    trape: {
        width: 200,
        height: 0,
        borderTopWidth: 70,

        borderLeftWidth: 25,
        borderLeftColor: "transparent",
        borderRightWidth: 25,
        borderRightColor: "transparent",
        borderStyle: "solid",
        alignSelf: "center",
        marginBottom: 10,
        borderRadius: 10

    },
    text:{ alignSelf: "center", color: "#fff", marginBottom: 30 },
    trape2: {
        width: 200,
        height: 40,
        backgroundColor: "red",

        marginBottom: 10,
        borderRadius: 15

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
