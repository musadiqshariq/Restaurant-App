import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, TouchableOpacity, Image, SafeAreaView, FlatList, StyleSheet } from "react-native";
import { ReduceItemQty, IncreaseItemQty, DeleteCartItem } from "../store/action";
import Icon from "react-native-vector-icons/MaterialIcons";
import { PrimaryButton } from "../components/button";


function Cart({ navigation }) {
    const cartData = useSelector(state => state.cart)
    const [totalPrice, setTotalPrice] = useState("")
    useEffect(() => {
        let price = 0;
        cartData.forEach(item => {
            price += item.itemPrice * item.qty
        });
        setTotalPrice(price);
    }, [cartData, totalPrice])
    const dispatch = useDispatch()
    const reduce_item_qty = (itemKey, itemQty) => {
        if (itemQty >= 2) {
            dispatch(ReduceItemQty(itemKey))
        }
    }
    const increase_item_qty = (itemKey) => {
        dispatch(IncreaseItemQty(itemKey))
    }
    const delete_cart_item = (itemKey) => {
        dispatch(DeleteCartItem(itemKey))
    }

    const CartCard = ({ item }) => {
        return (
            <View style={styles.cardView1}>
                <Image source={{ uri: item.image }} style={{ height: 80, width: 80 }} />
                <View style={styles.cardView2}>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.itemName}</Text>
                    <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 15 }}>Rs: {item.itemPrice}</Text>
                </View>
                <View style={{ width: "20%", justifyContent: "center", alignItems: "center" }}>
                    <View style={{ alignItems: "center", flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => reduce_item_qty(item.key, item.qty)} activeOpacity={0.8} style={styles.TO1}>
                            <Text style={{ fontSize: 20, color: "#fff" }}>-</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20 }}>{item.qty}</Text>
                        <TouchableOpacity onPress={() => { increase_item_qty(item.key) }} activeOpacity={0.8} style={styles.TO2}>
                            <Text style={{ fontSize: 20, color: "#fff" }}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: "flex-end", marginTop: 20 }}>
                        <TouchableOpacity onPress={() => delete_cart_item(item.key)} activeOpacity={0.8} style={{ width: 25, height: 25 }}>
                            {/* <Image style={{ width: 25, height: 25 }} source={require("../assits/delete.png")} /> */}
                            <Icon name = "delete" size = {40} color = {"#d50463"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (

        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
            <View style={styles.view1}>
                <Icon name="arrow-back-ios" size={28} onPress={() => navigation.goBack()} />
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Cart</Text>
            </View>
            <FlatList showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}
                data={cartData}
                renderItem={({ item }) => <CartCard item={item} />}
                ListFooterComponentStyle={{ paddingHorizontal: 20, marginTop: 20 }}
                ListFooterComponent={() => (<View>
                    <View style={styles.view2}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", }}>
                            Total Price
                        </Text>
                        <Text style={{ fontSize: 18, fontWeight: "bold", }}>
                            Rs: {totalPrice}
                        </Text>
                    </View>
                    {totalPrice !== 0 ? <View style={{ marginHorizontal: 30, }}>
                        <PrimaryButton title="CHECKOUT" onPress = {() => navigation.navigate("Checkout", {totalPrice})} />
                    </View> :
                        null
                    }

                </View>)}
            />
        </SafeAreaView>



    )
}

const styles = StyleSheet.create({
    view1: {
        paddingVertical: 20, 
        flexDirection: "row", 
        alignItems: "center", 
        marginHorizontal: 20
    },
    view2: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        marginVertical: 15
    },
    cardView1: {
        height: 100, 
        elevation: 15, 
        borderRadius: 10, 
        backgroundColor: "#fff", 
        marginVertical: 10, 
        marginHorizontal: 20, 
        paddingHorizontal: 10, 
        flexDirection: "row", 
        alignItems: "center"
    },
    cardView2: {
        height: 100, 
        marginLeft: 10, 
        paddingVertical: 20, 
        flex: 1
    },
    TO1: {
        marginRight: 3, 
        backgroundColor: "#d50463", 
        width: 20, alignItems: "center", 
        borderRadius: 3
    },
    TO2: {
        marginLeft: 3, 
        backgroundColor: "#d50463", 
        width: 20, alignItems: "center", 
        borderRadius: 3
    }
})


export default Cart;

