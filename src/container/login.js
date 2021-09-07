import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { useState } from "react";
import { loginUser } from "../store/action";
import { useDispatch } from "react-redux";



function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const user_login = () => {
        let user = {
            email,
            password
        }
        setEmail("");
        setPassword("");
        dispatch(loginUser(user, navigation))
    }
    return (

        <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.view1}>
                <Text style={{ color: "#fff", fontSize: 30 }}>Delicious Food</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", height: 150 }}>
                <Text style={{ color: "#d50463", fontSize: 30 }}> Login</Text>
            </View>
                <View style={{ flex: 4, marginTop: 10 }}>
                    <View style={{ alignItems: "center" }}>
                        <TextInput onChangeText={(text) => setEmail(text)} value={email} keyboardType = "email-address" placeholderTextColor="#d50463" placeholder="Enter email" style={styles.inp1}></TextInput>
                        <TextInput onChangeText={(text) => setPassword(text)} value={password} secureTextEntry={true} placeholderTextColor="#d50463" placeholder="Enter Password" style={{ ...styles.inp1, marginTop: 15 }}></TextInput>
                        {email && password ?
                            <TouchableOpacity onPress={user_login} activeOpacity={0.8} style={styles.TO1}>
                                <Text style={{ fontSize: 16, color: "#fff" }}>Login</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={user_login} activeOpacity={0.8} style={{...styles.TO1, display: "none"}}>
                                <Text style={{ fontSize: 16, color: "#faf5ef" }}>Login</Text>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity onPress={() => navigation.navigate("Signup")} activeOpacity={0.8} style={styles.TO2}>
                            <Text style={{ fontSize: 16, color: "#fff" }}>Create new account</Text>
                        </TouchableOpacity>
                    </View>
                </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    view1: {
        flex: 1, 
        backgroundColor: "#d50463", 
        alignItems: "center", 
        justifyContent: "center", 
        borderBottomRightRadius: 25, 
        borderBottomLeftRadius: 25, 
        height: 100
    },
    inp1: {
        width: "90%", 
        color: "black", 
        borderRadius: 25, 
        fontSize: 16, 
        borderColor: "#d50463", 
        borderWidth: 1
    },
    TO1: {
        justifyContent: "center", 
        alignItems: "center", 
        width: "80%", 
        backgroundColor: "#d50463", 
        marginTop: 20, 
        borderRadius: 20, 
        padding: 10
    }, 
    TO2: {
        justifyContent: "center", 
        alignItems: "center", 
        width: "50%", 
        backgroundColor: "#d50463", 
        marginTop: 20, 
        borderRadius: 20, 
        padding: 6
    }
})

export default Login;