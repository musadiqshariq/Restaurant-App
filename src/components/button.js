import React from "react";
import { View, Text, TouchableOpacity, Touchable } from "react-native";


function PrimaryButton({title, onPress = () => {}}){
    return(
        <TouchableOpacity activeOpacity = {0.8} onPress = {onPress} style = {{alignItems: "center"}}>
            <View style = {{backgroundColor: "#d50463", height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center", width: "70%"}}>
                <Text style = {{color: "#f6f6f6", fontSize: 18}}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}


function SecondaryButton({title, onPress = () => {}}){
    return(
        <TouchableOpacity activeOpacity = {0.8} onPress = {onPress} style = {{alignItems: "center"}}>
            <View style = {{backgroundColor: "#fff", height: 60, borderRadius: 30, justifyContent: "center", alignItems: "center", width: "70%"}}>
                <Text style = {{color: "#d50463", fontSize: 18}}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}


export {
    PrimaryButton,
    SecondaryButton
}