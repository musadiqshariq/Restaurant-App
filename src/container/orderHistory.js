import React from "react";
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";


function OrderHistory({ navigation }) {
    const order_History = useSelector(state => state.orderHistory)
    return (
        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
            <View style={styles.view1}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order History</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <View style={styles.view2}>
                        <Text style={{ fontSize: 30, color: "#d50463" }}>Order History</Text>
                    </View>
                </View>
                <View style={styles.view3}>
                    {order_History.map((v, i) => {
                        return (
                            <TouchableOpacity onPress = {() => navigation.navigate("OrderHistoryDetail", {v})} activeOpacity= {0.9} key={i} style={styles.TO1}>
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
    TO1: {
        paddingVertical: 20, 
        backgroundColor: "#fff", 
        paddingHorizontal: 10,  
        borderRadius: 20, 
        elevation: 20, 
        marginTop: 10
    }
})


export default OrderHistory;