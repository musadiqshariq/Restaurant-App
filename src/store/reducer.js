const INITIAL_STATE = {
    user: {},
    allUser: [],
    breakfast: [],
    lunch: [],
    dinner: [],
    cart: [],
    orderHistory: [],
    allOrders: []
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "userDatabaseData":
            return (
                {
                    ...state,
                    user: action.payload
                }
            )
        case "itemsBreakfastDatabaseData":
            return (
                {
                    ...state,
                    breakfast: action.payload,
                }
            )

        case "itemsLunchDatabaseData":
            return (
                {
                    ...state,
                    lunch: action.payload,

                }
            )
        case "itemsDinnerDatabaseData":
            return (
                {
                    ...state,
                    dinner: action.payload,
                }
            )
        case "AddCartData":
            const type = action.payload.food_type
            let item;
            if (type == "breakfast") {
                item = state.breakfast.find(
                    product => product.key === action.payload.itemId
                );
            } else if (type == "lunch") {
                item = state.lunch.find(
                    product => product.key === action.payload.itemId);
            } else if (type == "dinner") {
                item = state.dinner.find(
                    product => product.key === action.payload.itemId);
            }
            const inCart = state.cart.find(item =>
                item.key === action.payload.itemId ? true : false,
            );
            return {
                ...state,
                cart: inCart ?
                    state.cart.map(item =>
                        item.key === action.payload.itemId ?
                            { ...item, qty: item.qty + 1 }
                            : item,
                    )
                    : [...state.cart, { ...item, qty: 1 }]

            };
        case "CartReduceItemQty":
            return (
                {
                    ...state,
                    cart: state.cart.map(item =>
                        item.key === action.payload ?
                            { ...item, qty: item.qty - 1 }
                            : item
                    )
                }
            )

        case "CartIncreaseItemQty":
            return (
                {
                    ...state,
                    cart: state.cart.map(item =>
                        item.key === action.payload ?
                            { ...item, qty: item.qty + 1 }
                            : item
                    )
                }
            )

        case "CartDeleteItem":
            return (
                {
                    ...state,
                    cart: state.cart.filter(item => item.key != action.payload)
                }
            )

        case "cartKhaliKardo":
            return (
                {
                    ...state,
                    cart: []
                }
            )

        case "OrderHistory":
            return (
                {
                    ...state,
                    orderHistory: action.payload
                }
            )
        case "ALLOrders":
            return (
                {
                    ...state,
                    allOrders: action.payload
                }
            )
        case "userEmpty":
            return (
                {
                    ...state,
                    user: {}
                }
            )
        case "UsersData":
            return (
                {
                    ...state,
                    allUser: action.payload
                }
            )

        default:
            return state;
    }
}


export default reducer;