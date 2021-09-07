import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from "react-native";
import React, { useState } from "react";
import database from "@react-native-firebase/database";
import storage from "@react-native-firebase/storage";
import ImagePicker from "react-native-image-crop-picker";



function AddItems({ navigation }) {

    const [loader, setLoader] = useState(false)

    const [image, setImage] = useState(null)
    const [itemName, setItemName] = useState("")
    const [itemPrice, setItemPrice] = useState("")
    const [itemType, setItemType] = useState("")
    const [itemDetail, setItemDetail] = useState("")
    let key = database().ref("items").push().key
    let key2 = database().ref("items").push().key
    const imgPicker = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: false,
        }).then(image => {
            setImage(image.path)
        }).catch((err) => {
            console.log(err.message)
        })
    }
    const Add_Item = async () => {
        if (itemType.toLowerCase() == "breakfast" || itemType.toLowerCase() == "lunch" || itemType.toLowerCase() == "dinner") {
            setLoader(true)
            const uploadUri = image;
            await storage().ref("images").child(key2).putFile(uploadUri);
            const url = await storage().ref("images").child(key2).getDownloadURL();
            let item = {
                itemName,
                itemPrice,
                itemType: itemType.toLowerCase(),
                itemDetail,
                imageKey: key2,
                image: url,
                edit: false,
                key
            }
            setItemName("");
            setItemPrice("");
            setItemType("");
            setItemDetail("");
            setImage(null)
            database().ref("/").child(`items/${item.itemType}/${item.key}`).set(item)
                .then(() => {
                    setLoader(false)
                    alert("Item added successfully")
                })
                .catch(error => {
                    console.log(error.message)
                })
        } else {
            alert("Item type must be Breakfast or Lunch or Dinner.")
        }
    }

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.view1}>
                <Text style={styles.text1}>Delicious Food</Text>
            </View>
            <View style={styles.view2}>
                <Text style={styles.text2}> Add Item</Text>
            </View>
            {image ? <View style={styles.viewImg}>
                <Image style={styles.img} source={{ uri: image }} resizeMode="contain" />
            </View> :
                <View style={styles.view3}>
                    <Text style={styles.text3}> No Image Selected</Text>
                </View>}
            {loader ?
                <ActivityIndicator color="#d50463" size="large" /> :
                <View style={{ flex: 4, marginTop: 10 }}>
                    <View style={{ alignItems: "center" }}>
                        <TextInput onChangeText={(text) => setItemName(text)} value={itemName} placeholderTextColor="#d50463" placeholder="Enter Item Name" style={styles.inp1}></TextInput>
                        <TextInput onChangeText={(text) => setItemPrice(text)} value={itemPrice} keyboardType="phone-pad" placeholderTextColor="#d50463" placeholder="Enter Item Price" style={styles.inp2}></TextInput>
                        <TextInput onChangeText={(text) => setItemType(text)} value={itemType} placeholderTextColor="#d50463" placeholder="Enter Item Type (such as Breakfast)" style={styles.inp2}></TextInput>
                        <TextInput onChangeText={(text) => setItemDetail(text)} value={itemDetail} multiline={true} placeholderTextColor="#d50463" placeholder="Enter Item Detail" style={styles.inp2}></TextInput>
                        <TouchableOpacity onPress={() => imgPicker()} activeOpacity={0.8} style={styles.TO}>
                            <Text style={{ fontSize: 16, color: "#fff" }}>Select image</Text>
                        </TouchableOpacity>
                        {itemName && itemPrice && itemType && image ?
                            <TouchableOpacity onPress={Add_Item} activeOpacity={0.8} style={styles.TO}>
                                <Text style={{ fontSize: 16, color: "#fff" }}>Add Item</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={Add_Item} activeOpacity={0.8} style={{ justifyContent: "center", alignItems: "center", width: "80%", backgroundColor: "#f9a602", marginTop: 10, borderRadius: 20, padding: 10, display: "none" }}>
                                <Text style={{ fontSize: 16, color: "#faf5ef" }}>Add Item</Text>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity onPress={() => navigation.navigate("Home")} activeOpacity={0.8} style={styles.TO2}>
                            <Text style={{ fontSize: 16, color: "#fff" }}>Go To Home</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    scrollView : {
        flex: 1, 
        backgroundColor: "#fff"
    }, 
    view1: {
        flex: 1, 
        backgroundColor: "#d50463", 
        alignItems: "center", 
        justifyContent: "center", 
        borderBottomRightRadius: 25, 
        borderBottomLeftRadius: 25, 
        height: 100
    },
    text1: {
        color: "#fff", 
        fontSize: 30
    },
    view2: {
        flex: 0.7, 
        justifyContent: "center", 
        alignItems: "center"
    },
    text2: {
        color: "#d50463", 
        fontSize: 30
    },
    viewImg: {
        justifyContent: "center", 
        alignItems: "center", 
        borderWidth: 2, 
        borderColor: "#d50463"
    }, 
    img : {
        width: "80%", 
        height: 150
    }, 
    view3: {
        justifyContent: "center", 
        alignItems: "center", 
        borderWidth: 2, 
        borderColor: "#d50463", 
        height: 150
    },
    text3: {
        justifyContent: "center", 
        alignItems: "center", 
        fontSize: 20, 
        color: "#949494"
    },
    inp1: {
        width: "90%", 
        color: "black", 
        borderRadius: 25, 
        fontSize: 16, 
        borderColor: "#d50463", 
        borderWidth: 1
    },
    inp2: {
        width: "90%", 
        color: "black", 
        borderRadius: 25, 
        fontSize: 16, 
        borderColor: "#d50463", 
        borderWidth: 1, 
        marginTop: 5
    },
    TO: {
        justifyContent: "center", 
        alignItems: "center", 
        width: "80%", 
        backgroundColor: "#d50463", 
        marginTop: 10, 
        borderRadius: 20, 
        padding: 10
    },
    TO2: {
        justifyContent: "center", 
        alignItems: "center", 
        width: "50%", 
        backgroundColor: "#d50463", 
        marginTop: 10, 
        borderRadius: 20, 
        padding: 6
    }
})


export default AddItems;