import uuidv4 from 'uuid/v4'

import {SUCCESS_GET_CUSTOMERS_LIST, START_CUSTOMER_VALIDATION, ERROR_CUSTOMER_VALIDATION, 
    SUCCESS_CUSTOMER_VALIDATION, CUSTOMER_EDIT, CUSTOMER_INSERT} from '../actions/customers'

const initialState = {
    items: [],
    status: null,
    isValid: null
}

export default (state = initialState, action) => {
    const updatedList = [...state.items];
    switch (action.type) {
        case SUCCESS_GET_CUSTOMERS_LIST:
            return {
                ...state,
                items: action.items
            }
        case START_CUSTOMER_VALIDATION: 
            return {
                ...state,
                isValid: null
            }
        case SUCCESS_CUSTOMER_VALIDATION: 
            return {
                ...state,
                isValid: true
            }
        case ERROR_CUSTOMER_VALIDATION: 
            return {
                ...state,
                isValid: false
            }
        case CUSTOMER_EDIT:
            updatedList.splice(
                state.items.findIndex(customer => customer.id === action.item.id),
                1,
                action.item
            )
            return {
                ...state,
                items: updatedList
            }
        case CUSTOMER_INSERT:
            const updatedItem = {
                ...action.item,
                id: uuidv4()
            };
            updatedList.push(updatedItem);
            return {
                ...state,
                items: updatedList
            }
        default:
          return state
    }
}
