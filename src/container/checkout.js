import { View, Text, ScrollView, TextInput, SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SecondaryButton } from "../components/button";
import { EmptyCart } from "../store/action";



function Checkout({ route, navigation }) {
    const cart_data = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const user_id = auth().currentUser.uid
    let key = database().ref("items").push().key
    const { totalPrice } = route.params;
    let firstChar = contact.slice(0,1)
    let SecChar = contact.slice(1,2)

    const placeOrder = () => {
        if(contact.length == 11 && firstChar == 0 && SecChar == 3){
            let order_details = {
                contact,
                address,
                order: cart_data,
                bill: totalPrice,
                user: user_id,
                status: "Pending",
                key
            }
            database().ref("users").child(user_id).child("Orders").child(key).set(order_details)
            database().ref("All Orders").child(key).set(order_details)
                .then(() => {
                    alert("Order placed successfully")
                })
                .catch((err) => {
                    console.log(err.message)
                })
            setContact("")
            setAddress("")
            dispatch(EmptyCart())
            navigation.navigate("Home", {screen: "HomeScreen"})
        }else{
            alert("Enter valid contact number")
        }
        
    }
    return (
        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
            <View style={styles.view1}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Checkout</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <View style={styles.view2}>
                        <Icon name="done-all" size={180} />
                    </View>
                </View>
                <View style={styles.view3}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <TextInput onChangeText={(text) => setContact(text)} value={contact} keyboardType="phone-pad" placeholderTextColor="#d50463" placeholder="Enter contact" style={styles.inp1}></TextInput>
                        <TextInput onChangeText={(text) => setAddress(text)} value={address} placeholderTextColor="#d50463" placeholder="Enter dilevery address" style={styles.inp2}></TextInput>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 15 }}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
                                Total Price
                            </Text>
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
                                Rs: {totalPrice}
                            </Text>
                        </View>
                        {address && contact ?
                            <SecondaryButton title="Place Order" onPress={() => placeOrder()} /> :
                            null
                        }

                    </View>

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
    },
    inp1: {
        width: "90%", 
        color: "black", 
        borderRadius: 25, 
        fontSize: 16, 
        borderColor: "#d50463", 
        borderWidth: 1, 
        backgroundColor: "#fff"
    },
    inp2: {
        width: "90%", 
        color: "black", 
        borderRadius: 25, 
        fontSize: 16, 
        borderColor: "#d50463", 
        borderWidth: 1, 
        marginTop: 5, 
        backgroundColor: "#fff"
    }
})

export default Checkout;