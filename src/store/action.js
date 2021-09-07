import React from "react";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Login from '../container/login';
import { useSelector } from 'react-redux';
const signupUser = (user) => {
  return (dispatch) => {
    auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        let userInfo = {...user, uid: res.user.uid}
        database().ref("/").child(`users/${res.user.uid}`).set(userInfo)
        alert("User signup successfully")
      })
      .catch(error => {
        alert(error.message)
      });
  }
}



const loginUser = (user) => {
  return (dispatch) => {
    auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        database().ref("/").child(`users/${res.user.uid}`)
          .once("value", (data) => {
            dispatch({ type: "GetUser", payload: data.val() })
          })

      })
      .catch(error => {
        alert(error.message);
      });
  }
}
const dataCall = () => {
  return(dispatch) => { auth().currentUser.uid ?
    database().ref("/").child(`users/${auth().currentUser.uid}`).on("value", function (data) {
      dispatch({ type: "userDatabaseData", payload: data.val() })
      database().ref("/").child("items/breakfast").on("value", function (data) {
        dispatch({ type: "itemsBreakfastDatabaseData", payload: data.val() ? Object.values(data.val()) : [] })
         
      })
      database().ref("/").child("items/lunch").on("value", function (data) {
        dispatch({ type: "itemsLunchDatabaseData", payload: data.val() ? Object.values(data.val()) : [] })
        
      })
      database().ref("/").child("items/dinner").on("value", function (data) {
        dispatch({ type: "itemsDinnerDatabaseData", payload: data.val() ? Object.values(data.val()) : [] })
        
      })
      database().ref("users").child(auth().currentUser.uid).child("Orders").on("value", function (data) {
        dispatch({ type: "OrderHistory", payload: data.val() ? Object.values(data.val()) : [] })
        
      })
      database().ref("/").child("All Orders").on("value", function (data) {
        dispatch({ type: "ALLOrders", payload: data.val() ? Object.values(data.val()) : [] })
        
      })
      database().ref("users").on("value", function (data) {
        // console.log(data.val())
        dispatch({ type: "UsersData", payload: data.val() ? Object.values(data.val()) : [] })
      })

    }) : null
  }
}

const signout = () => {
  return (dispatch) => {
    auth()
      .signOut()
      .then(() => {
      })
      .catch(error => {
        console.log(error.message)
      })
      dispatch({type: "userEmpty"})
  }

}

const userData = (user_data) => {
  return (dispatch) => {
    dispatch({ type: "userDatabaseData", payload: user_data })
  }
}

const AddItem = (item) => {
  return (dispatch) => {
    database().ref("/").child(`items/${item.itemType}/${item.key}`).set(item)
      .then(() => {
        alert("Item added successfully")
      })
      .catch(error => {
        console.log(error.message)
      })

  }
}

const CartData = (itemId, food_type) => {

  return (dispatch) => {
    dispatch({ type: "AddCartData", payload: { itemId, food_type } })
  }
}

const ReduceItemQty = (item_key) => {
  return (dispatch) => {
    dispatch({ type: "CartReduceItemQty", payload: item_key })
  }
}

const IncreaseItemQty = (item_key) => {
  return (dispatch) => {
    dispatch({ type: "CartIncreaseItemQty", payload: item_key })
  }
}

const DeleteCartItem = (item_key) => {
  return (dispatch) => {
    dispatch({ type: "CartDeleteItem", payload: item_key })
  }
}

const EmptyCart = () => {
  return (dispatch) => {
    dispatch({ type: "cartKhaliKardo" })
  }
}

const OrderHistory = (data) => {
  return (dispatch) => {
    dispatch({ type: "OrderHistory", payload: data })
  }
}

export {
  signupUser,
  loginUser,
  signout,
  userData,
  AddItem,
  CartData,
  ReduceItemQty,
  IncreaseItemQty,
  DeleteCartItem,
  EmptyCart,
  OrderHistory, 
  dataCall
}