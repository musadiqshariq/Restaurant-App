import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SecondaryButton } from "../components/button";
import { useSelector, useDispatch } from "react-redux";
import database from "@react-native-firebase/database";
import storage from "@react-native-firebase/storage";
import { CartData } from "../store/action";


function DetailsScreen({ navigation, route }) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const item = route.params
    const cartData = useSelector(state => state.cart)
    const [condition, setCondition] = useState(false)
    useEffect(() => {
        cartData.map((v, i) => {
            if (item.key == v.key) {
                setCondition(true)
            }
        })
    }, [cartData])

    const delItem = () => {
        let id = item.key
        let image_Key = item.imageKey
        storage().ref("images").child(image_Key).delete()
        database().ref('/').child(`items/${item.itemType}/${id}`).remove()
            .then(() => {
                alert("Item deleted successsfully.")
                navigation.navigate("Home")
            })
            .catch((err) => {
                alert(err.message)
            })
    }
    const addToCart = () => {
        dispatch(CartData(item.key, item.itemType))
        alert("Item added to cart successfully")
    }
    return (
        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
            <View style={Styles.view1}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Details</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={Styles.view2}>
                    <Image source={{ uri: item.image }} style={{ height: 220, width: 220, borderRadius: 20 }} />
                </View>
                <View style={Styles.view3}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>{item.itemName}</Text>
                        <View style={Styles.view4}>
                            <Icon name="favorite-border" size={25} color={"#d50463"} />
                        </View>
                    </View>
                    <Text style={{ marginTop: 10, lineHeight: 22, fontSize: 16, color: "#fff", fontSize: 16 }}>
                        {item.itemDetail}
                    </Text>
                    {user.designation == "admin" || user.designation == "moderator" ? <View style={{ marginTop: 40, marginBottom: 40 }}>
                        <SecondaryButton title="Delete Item" onPress={() => delItem()} />
                    </View> :
                        !condition ?
                            <View style={{ marginTop: 40, marginBottom: 40 }}>
                                <SecondaryButton title="Add to cart" onPress={() => addToCart()} />
                            </View> :
                            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 15 }}>
                                <View style={{ justifyContent: "center", alignItems: "center",padding: 20, width: "80%", backgroundColor: "#fff", borderRadius: 20 }}>
                                    <Text style={{ lineHeight: 22, fontSize: 20, color: "#d50463", lineHeight: 25 }}>
                                        This item has been already added to cart
                                    </Text>
                                </View>
                            </View>

                    }

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    view1: {
        paddingVertical: 20, 
        alignItems: "center", 
        marginHorizontal: 20, 
        flexDirection: "row"
    },
    view2 : {
        justifyContent: "center", 
        alignItems: "center", 
        height: 280
    },
    view3: {
        paddingHorizontal: 20, 
        paddingTop: 40, 
        paddingBottom: 60, 
        backgroundColor: "#d50463", 
        borderTopRightRadius: 40, 
        borderTopLeftRadius: 40, 
        borderBottomLeftRadius: 40, 
        borderBottomRightRadius: 40
    },
    view4: {
        backgroundColor: "#fff", 
        justifyContent: "center", 
        width: 50, 
        height: 50, 
        alignItems: "center", 
        borderRadius: 30
    }
})

export default DetailsScreen;