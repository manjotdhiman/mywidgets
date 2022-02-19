import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../Constants/theme";
export default ({onPress,title})=>(
    <TouchableOpacity style={styles.button} onPress={onPress} >
         
    <Text style={styles.buttonText}>
        {title}
    </Text>

</TouchableOpacity>
)
const styles = StyleSheet.create({
    button: {
        height: 50,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: "orange",
       bottom:0,
       margin:5
    },
    buttonText:{
        color:colors.textButtonColor,
        fontSize:20,
        fontWeight:"600"
    }, 
})

