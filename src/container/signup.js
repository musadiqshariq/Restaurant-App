import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { signupUser } from "../store/action";
import { useDispatch } from "react-redux";
import database from "@react-native-firebase/database";



function Signup({ navigation }) {
    const [userInfo, setUserInfo] = useState([])
    let cond = false;
    useEffect(() => {
        database().ref("users").on("value", function (data) {
            setUserInfo(data.val() ? Object.values(data.val()) : [])
        })
    }, [])
    for (var i = 0; i < userInfo.length; i++) {
        if (userInfo[i].designation == "admin") {
            cond = true;
        }
    }
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [designation, setDesignation] = useState("");
    const dispatch = useDispatch();
    const signUp_user = () => {
        if (designation.toLowerCase() == "admin" || designation.toLowerCase() == "customer") {
            let user = {
                username,
                email,
                password,
                designation: designation.toLowerCase()
            }
            setUsername("");
            setEmail("");
            setPassword("");
            setDesignation("")
            dispatch(signupUser(user))
            cond = false

        } else {
            alert("Designation must be admin or customer")
        }
    }

    return (



        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.view1}>
                <Text style={{ color: "#fff", fontSize: 30 }}>Delicious Food</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", height: 150 }}>
                <Text style={{ color: "#d50463", fontSize: 30 }}>Signup</Text>
            </View>
            <View style={{ flex: 4, marginTop: 10 }}>
                <View style={{ alignItems: "center" }}>
                    <TextInput onChangeText={(text) => setUsername(text)} value={username} placeholderTextColor="#d50463" placeholder="Enter Username" style={{ width: "90%", color: "black", borderRadius: 25, fontSize: 16, borderColor: "#d50463", borderWidth: 1 }}></TextInput>
                    <TextInput onChangeText={(text) => setEmail(text)} value={email} keyboardType="email-address" placeholderTextColor="#d50463" placeholder="Enter email" style={{ width: "90%", color: "black", borderRadius: 25, fontSize: 16, borderColor: "#d50463", borderWidth: 1, marginTop: 10 }}></TextInput>
                    {cond ? <TextInput onChange={() => setDesignation("customer")} placeholderTextColor="#d50463" onChangeText={(text) => setPassword(text)} value={password} placeholder="Enter Passsword" secureTextEntry={true} style={{ width: "90%", color: "black", borderRadius: 25, fontSize: 16, borderColor: "#d50463", borderWidth: 1, marginTop: 10 }}></TextInput>
                        : <TextInput placeholderTextColor="#d50463" onChangeText={(text) => setPassword(text)} value={password} placeholder="Enter Passsword" secureTextEntry={true} style={{ width: "90%", color: "black", borderRadius: 25, fontSize: 16, borderColor: "#d50463", borderWidth: 1, marginTop: 10 }}></TextInput>}
                    {cond ? <TextInput placeholderTextColor="#d50463" onChangeText={(text) => setDesignation(text)} value={designation} placeholder="Enter Designation" style={{ width: "90%", color: "black", borderRadius: 25, fontSize: 16, borderColor: "#d50463", borderWidth: 1, marginTop: 5, display: "none" }}></TextInput>
                        : <TextInput placeholderTextColor="#d50463" onChangeText={(text) => setDesignation(text)} value={designation} placeholder="Enter Designation" style={{ width: "90%", color: "black", borderRadius: 25, fontSize: 16, borderColor: "#d50463", borderWidth: 1, marginTop: 10 }}></TextInput>}
                    {email && password && username && designation ?
                        <TouchableOpacity onPress={signUp_user} activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "center", width: "80%", backgroundColor: "#d50463", marginTop: 20, borderRadius: 20, padding: 10 }}>
                            <Text style={{ fontSize: 16, color: "#fff" }}>Signup</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={signUp_user} activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "center", width: "80%", backgroundColor: "#f9a602", marginTop: 20, borderRadius: 20, padding: 10, display: "none" }}>
                            <Text style={{ fontSize: 16, color: "#faf5ef" }}>Signup</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={() => navigation.navigate("Login")} activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "center", width: "50%", backgroundColor: "#d50463", marginTop: 20, borderRadius: 20, padding: 6 }}>
                        <Text style={{ fontSize: 16, color: "#fff" }}>Go to login</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </ScrollView>
    )
}

const styles =StyleSheet.create({
    view1: {
        flex: 1, 
        backgroundColor: "#d50463", 
        alignItems: "center", 
        justifyContent: "center", 
        borderBottomRightRadius: 25, 
        borderBottomLeftRadius: 25, 
        height: 100
    }
})


export default Signup;