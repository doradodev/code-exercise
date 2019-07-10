import { createStore, combineReducers } from 'redux';
import rows from './reducers/rows'

const reducer = combineReducers({
    rows
});

const store = createStore(reducer)

export default store;