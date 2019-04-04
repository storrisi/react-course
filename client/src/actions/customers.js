import axios from 'axios'

export const START_GET_DATA = 'START_GET_DATA'
export const SUCCESS_GET_DATA = 'SUCCESS_GET_DATA'
export const ERROR_GET_DATA = 'ERROR_GET_DATA'

/*
 * action creators
 */

export function startGetData() {
  return { type: START_GET_DATA }
}

export function successGetData(text) {
  return { type: SUCCESS_GET_DATA, text }
}

export function errorGetData(text) {
  return { type: ERROR_GET_DATA, text }
}

export function loadData() {
    return (dispatch) => { //REDUX THUNK
        dispatch(startGetData());
        axios.post('testurl',{}).then((data) =>
            dispatch(successGetData(data)) //Action dispatch
        ).catch(error =>
            dispatch(errorGetData(error))  //Action dispatch
        )
    }
}