import React from "react";
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import database from "@react-native-firebase/database";

function RemoveMod({ navigation }) {
    const all_users = useSelector(state => state.allUser)
    const RemModerator = (index, value) => {
        let id = all_users[index].uid
        let user_obj = {
            designation: "customer",
            email: value.email,
            password: value.password,
            uid: id,
            username: value.username
        }
        database().ref("users").child(id).set(user_obj)
        .then(() => {
            alert("Moderator successfully converted as customer")
        })
        .catch((err) => {
            console.log(eer.message)
        })
    }
    return (
        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
            <View style={styles.view1}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Remove Moderator</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <View style={styles.view2}>
                        <Text style = {{fontSize: 30, color: "#d50463"}}>Moderators</Text>
                    </View>
                </View>
                <View style={styles.view3}>
                {all_users.map((v, i) => {
                        return (
                            v.designation == "moderator" ?
                                <View key = {i} style={styles.view4}>
                                    <View>
                                        <Text style={{ fontSize: 25, color: "#d50463" }}>{v.username}</Text>
                                    </View>
                                    <TouchableOpacity onPress = {() => RemModerator(i, v)} activeOpacity={0.9} style={styles.TO}>
                                        <Text style={{ fontSize: 20, color: "#fff" }}>Remove</Text>
                                    </TouchableOpacity>
                                </View> :
                                null
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    view1: {
        paddingVertical: 20, 
        alignItems: "center", 
        marginHorizontal: 20, 
        flexDirection: "row"
    },
    view2: {
        justifyContent: "center", 
        alignItems: "center", 
        height: 70, 
        paddingHorizontal: 20, 
        width: "95%"
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
    },
    view4: {
        width: "100%", 
        backgroundColor: "#fff", 
        borderRadius: 5, 
        justifyContent: "space-between", 
        paddingVertical: 5, 
        flexDirection: "row", 
        paddingHorizontal: 15, 
        marginTop: 20
    },
    TO: {
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#d50463", 
        paddingHorizontal: 10, 
        borderRadius: 2
    }
})

export default RemoveMod;