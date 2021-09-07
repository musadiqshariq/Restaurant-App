import React from "react";
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";


function AllOrdersDetail({ navigation, route }) {
    const obj = route.params
    return (
        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
            <View style={styles.view1}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Detail</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <View style={styles.view2}>
                        <Text style={{ fontSize: 30, color: "#d50463" }}>Detail</Text>
                    </View>
                </View>
                <View style={styles.view3}>
                    <View style={styles.view4}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#d50463" }}>Order ID: {obj.v.key}</Text>
                        <View style={{ marginTop: 20 }}>
                            <Text style={{ fontSize: 20, color: "#d50463" }}>Contact No. :   {obj.v.contact}</Text>
                            <Text style={{ fontSize: 20, color: "#d50463" }}>Delivery Address:   {obj.v.address}</Text>
                            <Text style={{ fontSize: 20, color: "#d50463" }}>No. of items:   {obj.v.order.length}</Text>
                            <Text style={{ fontSize: 20, color: "#d50463" }}>Total bill:   {obj.v.bill}</Text>
                            <View style={{ marginTop: 20 }}>
                                {obj.v.order.map((v, i) => {
                                    return (
                                        <View key={i} style={styles.view5}>
                                            <Text style={{ fontSize: 20, color: "#d50463" }}>Item no. {i + 1}</Text>
                                            <View style={{ marginTop: 10 }}>
                                                <Text style={{ fontSize: 16 }}>Item Name:  {v.itemName}</Text>
                                                <Text style={{ fontSize: 16 }}>Item Quantity:  {v.qty}</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
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
        paddingHorizontal: 10, 
        paddingVertical: 20, 
        backgroundColor: "#fff", 
        borderRadius: 20
    },
    view5: {
        marginTop: 5, 
        borderWidth: 1, 
        borderColor: "#d50463", 
        padding: 5, 
        borderRadius: 3
    }
})


export default AllOrdersDetail;