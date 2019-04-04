import {SUCCESS_GET_CUSTOMERS_LIST} from '../actions/customers'

const initialState = {
    items: [],
    status: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SUCCESS_GET_CUSTOMERS_LIST:
            return {
                ...state,
                items: action.items
            }
        default:
          return state
    }
}
