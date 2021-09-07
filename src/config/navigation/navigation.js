import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../../container/login";
import Signup from "../../container/signup";
import AddItems from '../../container/addItem';
import Cart from '../../container/cart';
import OrderHistory from '../../container/orderHistory';
import Checkout from '../../container/checkout';
import OnBoard from '../../container/onBoard';
import BottomNavigator from './bottomNavigation';
import DetailsScreen from '../../container/detailsScreen';
import AddMod from '../../container/addMod';
import RemoveMod from '../../container/removeMod';
import OrderHistoryDetail from '../../container/OrderHistoryDetails';
import AllOrdersDetail from '../../container/allOrdersDetail';
import AllOrders from '../../container/allOrders';
import React from "react";
import auth from '@react-native-firebase/auth';
import { useState, useEffect } from 'react';

const Stack = createNativeStackNavigator();

function AppNavigation(navigation) {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    return (
        <NavigationContainer>
            {user ?
                <Stack.Navigator>
                    <Stack.Screen name="OnBoard" component={OnBoard} options={{ headerShown: false }} />
                    <Stack.Screen name="Home" component={BottomNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name="AddItems" component={AddItems} options={{ headerShown: false }} />
                    <Stack.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
                    <Stack.Screen name="OrderHistory" component={OrderHistory} options={{ headerShown: false }} />
                    <Stack.Screen name="Checkout" component={Checkout} options={{ headerShown: false }} />
                    <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="AddMod" component={AddMod} options={{ headerShown: false }} />
                    <Stack.Screen name="RemoveMod" component={RemoveMod} options={{ headerShown: false }} />
                    <Stack.Screen name="OrderHistoryDetail" component={OrderHistoryDetail} options={{ headerShown: false }} />
                    <Stack.Screen name="AllOrders" component={AllOrders} options={{ headerShown: false }} />
                    <Stack.Screen name="AllOrdersDetail" component={AllOrdersDetail} options={{ headerShown: false }} />
                </Stack.Navigator>
                :
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
                </Stack.Navigator>

            }

        </NavigationContainer>
    )
}


export default AppNavigation;