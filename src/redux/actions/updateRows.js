export const type = 'updateRows';
const updateRows = (rows) => {

    return{
      type ,
      payload: rows
    };
};

export default updateRows;