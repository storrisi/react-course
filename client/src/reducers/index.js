import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import {history} from '../config/history'
 
import customers from './customers';

const rootReducer = combineReducers({
    customers,
    router: connectRouter(history),
});

export default rootReducer