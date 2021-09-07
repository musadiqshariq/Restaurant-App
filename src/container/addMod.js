import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Icon from "react-native-vector-icons/MaterialIcons";
import database from "@react-native-firebase/database";

function AddMod({ navigation }) {
    useEffect(() => {

    }, [name])
    const all_users = useSelector(state => state.allUser)
    const [name, setName] = useState("")
    const addModerator = (index, value) => {
        let id = all_users[index].uid
        let user_obj = {
            designation: "moderator",
            email: value.email,
            password: value.password,
            uid: id,
            username: value.username
        }
        database().ref("users").child(id).set(user_obj)
            .then(() => {
                alert("User successfully added as moderator")
            })
            .catch((err) => {
                console.log(err.message)
            })
        setName("")
    }
    return (
        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
            <View style={styles.view1}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Add Moderator</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <View style={styles.view2}>
                        <TextInput keyboardType="email-address" onChangeText={(text) => setName(text)} value={name} placeholder="Search email here" placeholderTextColor="#d50463" style={styles.inp1} />
                    </View>
                </View>
                <View style={styles.view3}>
                    {all_users.map((v, i) => {
                        return (
                            name == v.email && v.designation !== "admin" && v.designation !== "moderator" ?
                                <View key={i} style={styles.view4}>
                                    <View>
                                        <Text style={{ fontSize: 25, color: "#d50463" }}>{v.username}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => addModerator(i, v)} activeOpacity={0.9} style={styles.TO}>
                                        <Text style={{ fontSize: 25, color: "#fff" }}>Add</Text>
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

const styles = StyleSheet.create({
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
    inp1: {
        borderWidth: 2, 
        borderColor: "#d50463", 
        width: "100%", 
        borderRadius: 5, 
        fontSize: 16, 
        color: "black"
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
    view4 : {
        width: "100%", 
        backgroundColor: "#fff", 
        borderRadius: 5, 
        justifyContent: "space-between", 
        paddingVertical: 5, 
        flexDirection: "row", 
        paddingHorizontal: 15
    },
    TO: {
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#d50463", 
        paddingHorizontal: 10, 
        borderRadius: 2
    }
})

export default AddMod;