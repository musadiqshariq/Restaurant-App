import React from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SecondaryButton } from "../components/button";
import { useSelector } from "react-redux";


function OrderDetails({ navigation }) {
    const user = useSelector(state => state.user)
    return (
        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
            <View style={styles.view1}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Details</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <View style={styles.view2}>
                        <Icon name="shopping-bag" size={180} />
                    </View>
                </View>
                <View style={styles.view3}>
                    {user.designation == "customer" ?
                        <View>
                            <SecondaryButton title="View Order History" onPress={() => navigation.navigate("OrderHistory")} />
                        </View> :
                        <View>
                            <SecondaryButton title="View Orders" onPress = {() => navigation.navigate("AllOrders")} />
                        </View>
                    }

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
    }
})

export default OrderDetails;