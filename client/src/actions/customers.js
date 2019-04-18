
import axios from 'axios'
import {validateFields, validateCCNo, validateIban} from '../utils/validations'

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

/*
 * VALIDATION
 */
export const START_CUSTOMER_VALIDATION = 'customers/validation/start'
export const SUCCESS_CUSTOMER_VALIDATION = 'customers/validation/success'
export const ERROR_CUSTOMER_VALIDATION = 'customers/validation/error'

export function startCustomerValidation() {
    return { type: START_CUSTOMER_VALIDATION }
}
  
export function successCustomerValidation(items) {
    return { type: SUCCESS_CUSTOMER_VALIDATION, items }
}

export function errorCustomerValidation(error) {
    return { type: ERROR_CUSTOMER_VALIDATION, error }
}

export function validateAll(currentCustomer) {
    return (dispatch) => {
        dispatch(startCustomerValidation())
        Promise.all([validateFields(
            ["first_name", "last_name", "birth_date", "balance", "iban", "credit_card"],
            currentCustomer
        ), validateIban(currentCustomer.iban), validateCCNo(currentCustomer.credit_card)]).then(res => 
            dispatch(successCustomerValidation())
        ).catch(err => 
            dispatch(errorCustomerValidation(err))
        )
    }
}

/* EDIT ITEM */
export const CUSTOMER_INSERT = 'customers/insert'
export const CUSTOMER_EDIT = 'customers/edit'

export function insertCustomer(item) {
    return { type: CUSTOMER_INSERT, item }
}

export function editCustomer(item) {
    return { type: CUSTOMER_EDIT, item }
}

export function updateCustomer(currentCustomer) {
    return (dispatch, getState) => new Promise(function(resolve, reject) {
        currentCustomer.id ? dispatch(editCustomer(currentCustomer)) : dispatch(insertCustomer(currentCustomer))
        resolve()
    })
}