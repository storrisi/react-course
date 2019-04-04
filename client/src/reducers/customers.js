import {
    START_GET_DATA,
    SUCCESS_GET_DATA,
    ERROR_GET_DATA
  } from '../actions/customers';
  
  const initialState = {
    items: [],
    status: null,
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case START_GET_DATA:
        return {
          ...state,
          status: 'LOADING'
        }
  
      case SUCCESS_GET_DATA:
        return {
          ...state,
          items: action.data,
          status: 'SUCCESS'
        }
  
      case ERROR_GET_DATA:
        return {
          ...state,
          status: 'ERROR'
        }
  
      default:
        return state
    }
  }