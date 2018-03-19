import {combineReducers} from 'redux';
import {listUsers} from './authReducer';
import {reducer} from './authReducer';

export default combineReducers({
    listUsers :listUsers,
    reducer: reducer
});
