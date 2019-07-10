import {type as updateRows} from '../actions/updateRows'

let rows = [];

function reducer(state = rows, {type, payload}) {

    switch (type) {
        case updateRows: {
            rows = rows.concat(payload);
            return rows;
        }
        default:
            return state;
    }
}

export default reducer;