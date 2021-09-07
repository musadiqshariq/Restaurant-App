import React from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SecondaryButton } from "../components/button";
import { useSelector, useDispatch } from "react-redux";
import { signout } from "../store/action";


function Profile({ navigation }) {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const user_signout = () => {
        dispatch(signout())
    }
    return (
        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
            <View style={Styles.view1}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Profile</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <View style={Styles.view2}>
                        <Icon name="perm-identity" size={200} />
                    </View>
                </View>
                <View style={Styles.view3}>
                    <View style={{}}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", paddingVertical: 10 }}>Username :    {user.username}</Text>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", paddingVertical: 10 }}>Email :    {user.email}</Text>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff", paddingVertical: 10 }}>Designation :    {user.designation}</Text>
                    </View>
                    {user.designation == "admin" ?
                        <View>
                            <View style={{ marginTop: 10 }}>
                                <SecondaryButton title="Add Moderator" onPress = {() => navigation.navigate("AddMod")} />
                            </View>
                            <View style={{ marginTop: 10  }}>
                                <SecondaryButton title="Remove Moderator" onPress = {() => navigation.navigate("RemoveMod")} />
                            </View>
                        </View> :
                        null
                    }
                    <View style={{ marginTop: 30 }}>
                        <SecondaryButton title="Sign Out" onPress={() => user_signout()} />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const Styles = StyleSheet.create({
    view1: {
        paddingVertical: 20, 
        alignItems: "center", 
        marginHorizontal: 20, 
        flexDirection: "row"
    },
    view2: {
        justifyContent: "center", 
        alignItems: "center", 
        height: 220, 
        borderWidth: 2, 
        borderColor: "#d50463", 
        borderRadius: 50, 
        paddingHorizontal: 20, 
        width: "70%"
    },
    view3: {
        paddingHorizontal: 20, 
        paddingTop: 40, 
        paddingBottom: 60, 
        backgroundColor: "#d50463", 
        borderTopRightRadius: 40, 
        borderTopLeftRadius: 40, 
        borderBottomLeftRadius: 40, 
        borderBottomRightRadius: 40, 
        marginTop: 10
    }
})

export default Profile;