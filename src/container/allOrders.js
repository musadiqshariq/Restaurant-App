import React from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";


function AllOrders({ navigation }) {
    const all_orders = useSelector(state => state.allOrders)
    console.log(all_orders)
    return (
        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
            <View style={styles.view1}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>All Orders</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <View style={styles.view2}>
                        <Text style={{ fontSize: 30, color: "#d50463" }}>All Orders</Text>
                    </View>
                </View>
                <View style={styles.view3}>
                    {all_orders.map((v, i) => {
                        return (
                            <TouchableOpacity onPress = {() => navigation.navigate("AllOrdersDetail", {v})} activeOpacity= {0.9} key={i} style={styles.TO}>
                                <Text style={{ color: "#d50463", fontSize: 20, fontWeight: "bold" }}>Order ID: {v.key}</Text>
                                <View style = {{marginTop: 10}}>
                                    <Text style = {{ fontSize: 16, color: "#d50463"}}>No. of items: {v.order.length}</Text>
                                    <Text style = {{marginTop: 5, fontSize: 16, color: "#d50463"}}>Total Bill: {v.bill}</Text>
                                </View>
                            </TouchableOpacity>
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
    TO: {
        paddingVertical: 20, 
        backgroundColor: "#fff", 
        paddingHorizontal: 10,  
        borderRadius: 20, 
        elevation: 20, 
        marginTop: 10
    }
})


export default AllOrders;