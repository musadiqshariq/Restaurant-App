import { View, Text, SafeAreaView, Image } from "react-native";
import { PrimaryButton } from "../components/button";
import React from "react";

function OnBoard({navigation}) {
    return (
        <SafeAreaView style={{ backgroundColor: "#f6f6f6", flex: 1 }}>
            <View style={{ height: 350, alignItems: "center" }}>
                <Image source={require('../assits/onBorad.png')} style={{ width: "80%", resizeMode: "contain", top: "10%" }} />
            </View>
            <View style = {{flex:1, paddingHorizontal: "5%", justifyContent: "space-between", paddingBottom: "5%"}}>
                <View>
                    <Text style={{ fontSize: 30, fontWeight: "bold", textAlign: "center" }}>
                        Delicious Food
                    </Text>
                    <Text style={{ fontSize: 16, textAlign: "center", marginTop: "6%", color: "#808080" }}>
                        We help you to find best and delicious food
                    </Text>
                </View>
                <View style = {{flex:1, height: 50, justifyContent: "center", flexDirection: "row", alignItems: "center"}}>
                    <View  style = {{height: 12, width: 30, backgroundColor: "black", borderRadius: 10, marginHorizontal: 5}}></View>
                    <View  style = {{height: 12, width: 12, backgroundColor: "#808080", borderRadius: 6, marginHorizontal: 5}}></View>
                    <View  style = {{height: 12, width: 12, backgroundColor: "#808080", borderRadius: 6, marginHorizontal: 5}}></View>
                </View>
                <PrimaryButton onPress = {() => navigation.navigate("Home")} title = "Get Started"/>
            </View>

        </SafeAreaView>
    )

}

export default OnBoard;