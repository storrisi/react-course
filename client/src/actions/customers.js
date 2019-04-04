
import axios from 'axios'

export const START_GET_CUSTOMERS_LIST = 'customers/list/get'
export const SUCCESS_GET_CUSTOMERS_LIST = 'customers/list/success'
export const ERROR_GET_CUSTOMERS_LIST = 'customers/list/error'

export function startGetCustomersList() {
    return { type: START_GET_CUSTOMERS_LIST }
}
  
export function successGetCustomersList(items) {
    return { type: SUCCESS_GET_CUSTOMERS_LIST, items }
}

export function errorGetCustomersList(error) {
    return { type: ERROR_GET_CUSTOMERS_LIST, error }
}

export function loadData() {
    return (dispatch) => { //REDUX THUNK
        dispatch(startGetCustomersList());
        axios.get(`${process.env.REACT_APP_API_URL}/api/getCustomers`).then((result) =>
            dispatch(successGetCustomersList(result.data)) //Action dispatch
        ).catch(error =>
            dispatch(errorGetCustomersList(error))  //Action dispatch
        )
    }
}