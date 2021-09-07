import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput, FlatList, Dimensions, Image, TouchableHighlight, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import { dataCall } from "../store/action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";


function Home({ navigation }) {
    const [loader, setLoader] = useState(true)
    const [breakfast, setBreakfast] = useState(true)
    const [lunch, setLunch] = useState(false)
    const [dinner, setDinner] = useState(false)
    const breakfastData = useSelector(state => state.breakfast)
    const lunchData = useSelector(state => state.lunch)
    const dinnerData = useSelector(state => state.dinner)
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(dataCall())
    }, [])
    const [data, setData] = useState([])
    useEffect(() => {
        if (breakfast) {
            setData(breakfastData)
        } else if (lunch) {
            setData(lunchData)
        } else if (dinner) {
            setData(dinnerData)
        }
        if (data.length >= 1) {
            setLoader(false)
        }
    }, [breakfastData, lunchData, dinnerData, breakfast, lunch, dinner])
    const { width } = Dimensions.get("screen")
    const cardWidth = width / 2 - 20
    const breakfastfunc = () => {
        setBreakfast(true)
        setLunch(false)
        setDinner(false)
    }
    const lunchfunc = () => {
        setBreakfast(false)
        setLunch(true)
        setDinner(false)
    }
    const dinnerfunc = () => {
        setBreakfast(false)
        setLunch(false)
        setDinner(true)
    }

    const Card = ({ food }) => {
        return (
            <TouchableHighlight underlayColor={"#fff"} activeOpacity={0.9} onPress={() => navigation.navigate("DetailsScreen", food)}>
                <View style={{ height: 220, width: cardWidth, marginHorizontal: 10, marginBottom: 20, marginTop: 50, borderRadius: 15, elevation: 13, backgroundColor: "#fff" }}>
                    <View style={{ alignItems: "center", top: -40 }}>
                        <Image source={{ uri: food.image }} style={{ height: 120, width: 120, borderRadius: 20 }} />
                    </View>
                    <View style={{ marginHorizontal: 5 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{food.itemName}</Text>
                        <Text></Text>
                    </View>
                    <View style={{ marginTop: 5, marginHorizontal: 10, flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                            Rs: {food.itemPrice}
                        </Text>
                        <TouchableOpacity activeOpacity={1} style={{ height: 30, width: 30, borderRadius: 20, backgroundColor: "#d50463", justifyContent: "center", alignItems: "center" }}>
                            <Icon name="add" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableHighlight>

        )
    }

    return (

        <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
            <View style={styles.view1}>
                <View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={{ fontSize: 28 }}>
                            Hello,
                        </Text>
                        <Text style={styles.text1}>
                            {user.username}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.text2}>What do you want today</Text>
                    </View>
                </View>
                {user.designation == "admin" || user.designation == "moderator" ? <TouchableOpacity onPress = {() => navigation.navigate("AddItems")} activeOpacity = {0.9} style= {styles.TO1}>
                    <Icon name = "add" size = {28} color = "#fff" />
                </TouchableOpacity> : null}
                
            </View>
            <View style={{ marginTop: 40, flexDirection: "row", paddingHorizontal: 20 }}>
                <View style={styles.view2}>
                    <Icon name="search" size={28} />
                    <TextInput style={{ flex: 1, fontSize: 18, color: "black" }} placeholder="Search for food" placeholderTextColor="grey" />
                </View>
                <View style={styles.view3}>
                    <Icon name="tune" size={28} color="#fff" />
                </View>
            </View>
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10, marginLeft: 10 }}>
                    {breakfast ?
                        <TouchableOpacity onPress={() => breakfastfunc()} activeOpacity={1} style={styles.TO2}>
                            <Text style={{ color: "#fff", fontSize: 16 }}>
                                Breakfast
                            </Text>
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={() => breakfastfunc()} activeOpacity={1} style={styles.TO3}>
                            <Text style={{ color: "black", fontSize: 16 }}>
                                Breakfast
                            </Text>
                        </TouchableOpacity>}
                    {lunch ? <TouchableOpacity onPress={() => lunchfunc()} activeOpacity={1} style={{...styles.TO2, marginLeft: 5 }}>
                        <Text style={{ color: "#fff", fontSize: 16 }}>
                            Lunch
                        </Text>
                    </TouchableOpacity> :
                        <TouchableOpacity onPress={() => lunchfunc()} activeOpacity={1} style={{...styles.TO3, marginLeft: 5 }}>
                            <Text style={{ color: "black", fontSize: 16 }}>
                                Lunch
                            </Text>
                        </TouchableOpacity>}
                    {dinner ? <TouchableOpacity onPress={() => dinnerfunc()} activeOpacity={1} style={{...styles.TO2, marginLeft: 5 }}>
                        <Text style={{ color: "#fff", fontSize: 16 }}>
                            Dinner
                        </Text>
                    </TouchableOpacity> :
                        <TouchableOpacity onPress={() => dinnerfunc()} activeOpacity={1} style={{...styles.TO3, marginLeft: 5 }}>
                            <Text style={{ color: "black", fontSize: 16 }}>
                                Dinner
                            </Text>
                        </TouchableOpacity>}

                </ScrollView>
            </View>
            {loader ? <ActivityIndicator size="large" color="#d50463" style={{ justifyContent: "center" }} /> :
                <FlatList
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    data={data}
                    renderItem={({ item }) => <Card food={item} />}
                />}

        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    view1: {
        marginTop: 20, 
        flexDirection: "row", 
        justifyContent: "space-between", 
        paddingHorizontal: 20
    },
    text1: {
        fontSize: 28, 
        fontWeight: "bold", 
        marginLeft: 10
    },
    text2: {
        marginTop: 5, 
        fontSize: 20, 
        color: "grey"
    },
    TO1: {
        width: 50, 
        height: 50, 
        justifyContent: "center", 
        alignItems: "center", 
        borderRadius: 30, 
        backgroundColor: "#d50463"
    },
    view2 :{
        flex: 1, 
        height: 50, 
        flexDirection: "row", 
        backgroundColor: "#d5d8db", 
        borderRadius: 10, 
        alignItems: "center", 
        paddingHorizontal: 20
    },
    view3: {
        width: 50, 
        height: 50, 
        marginLeft: 10, 
        backgroundColor: "#d50463", 
        borderRadius: 10, 
        justifyContent: "center", 
        alignItems: "center"
    },
    TO2: {
        width: 130, 
        height: 40, 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#d50463", 
        borderRadius: 20
    },
    TO3: {
        width: 130, 
        height: 40, 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: "#d5d8db", 
        borderRadius: 20
    }
})

export default Home;