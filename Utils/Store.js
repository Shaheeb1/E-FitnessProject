import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();
const iState = {
//Saving all user actions displayed below into browser
  darkMode: Cookies.get('darkMode') === 'ON' ? true: false,
  basket: {
    basketItems: Cookies.get('basketItems')
    ? JSON.parse(Cookies.get('basketItems'))
    : [], 
    shippingAddress: Cookies.get('shippingAddress')
    ? JSON.parse(Cookies.get('shippingAddress'))
    : {}, 
    paymentMethod: Cookies.get('paymentMethod')
    ? (Cookies.get('paymentMethod'))
    : '', 
    
  },
    //userInformation: Cookies.get('userInformation')
   // ? JSON.parse(Cookies.get('userInformation'))
    //: null, 
};

function reducer(state, action) {
  switch(action.type) {
    case 'DARK_MODE':
      return {...state, darkMode: true};
      case 'DARK_MODE_OFF':
      return {...state, darkMode: false};
      case 'BASKET_ADD_ITEM': {
        const addItem = action.payload;
        const itemExists = state.basket.basketItems.find(item => item._id 
          === addItem._id);
        const basketItems = itemExists ? state.basket.basketItems.map((item) =>
         item.name === itemExists.name?addItem: item)
        : [...state.basket.basketItems, addItem];
        Cookies.set('basketItems', JSON.stringify(basketItems));
        return { ...state, basket: {...state.basket, basketItems}};
      }
      case 'BASKET_REMOVE_ITEM':
        {
          const basketItems = state.basket.basketItems.filter(item => item._id !== action.payload._id);
          Cookies.set('basketItems', JSON.stringify(basketItems));
          return { ...state, basket: {...state.basket, basketItems}};
        }

        case'SHIPPING_ADDRESS':
        return{
          ...state,
           basket: { ...state.basket, shippingAddress: action.payload} };

           case'PAYMENT_SAVED':
           return{
             ...state,
              basket: { ...state.basket, paymentMethod: action.payload} };
          case'BASKET_CLEAR':
           return {...state, basket:{...state.basket, basketItems: []}};
        case 'USER_SIGNIN':
          return { ...state, userInformation: action.payload };
          case 'USER_SIGNOUT':
          return { ...state, userInformation: null, 
            basket: {basketItems: [], shippingAddress:{}, paymentMethod:''}, 
          };
       
      default:
        return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, iState);
  const value = {state, dispatch};
  return <Store.Provider value={value}>
    {props.children}
  </Store.Provider>

}