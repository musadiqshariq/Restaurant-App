import "react-native-gesture-handler";
import Home from "../../container/home";
import Cart from "../../container/cart";
import Profile from "../../container/profile";
import OrderDetails from "../../container/orderDetails";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View } from "react-native";


const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {
                height: 55,
                borderTopWidth: 0,
                elevation: 0
            },
            tabBarActiveTintColor: "#d50463"
        }}>
            <Tab.Screen
                name="Home Screen"
                component={Home}
                options={{ tabBarIcon: ({ color }) => <Icon name="home-filled" color={color} size={28} />, headerShown: false }}
            />
            <Tab.Screen
                name="Order Details"
                component={OrderDetails}
                options={{ tabBarIcon: ({ color }) => <Icon name="shopping-bag" color={color} size={28} />, headerShown: false }}
            />
            <Tab.Screen
                name="Cart"
                component={Cart}
                options={{
                    tabBarIcon: ({ color }) => (<View style={{ height: 60, width: 60, justifyContent: "center", alignItems: "center", backgroundColor: "#fff", borderColor: "#d50463", borderWidth: 2, borderRadius: 30, top: -25, elevation: 5 }}>
                        <Icon name="shopping-cart" color={color} size={28} />
                    </View>), headerShown: false
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{ tabBarIcon: ({ color }) => <Icon name="perm-identity" color={color} size={28} />, headerShown: false }}
            />
        </Tab.Navigator>
    )
}


export default BottomNavigator;