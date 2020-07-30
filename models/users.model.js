const db = require('../utils/db');
const { all } = require('./category.model');
const TBL_ACC = 'account';

module.exports = {
    all: () => {
        return db.load(`select * from ${TBL_ACC} order by accID`);
    },
    single: (id) => {
        return db.load(`select*from ${TBL_ACC} where accID="${id}"`);
    },
    singleByUsername: (usn) => {
        return db.load(`select*from ${TBL_ACC} where username="${usn}"`);
    },
    allWithNoAdmin: () => {
        return db.load(`select * from ${TBL_ACC} where type != 1 order by accID`);
    },
    patch: (entity) => {
        const condition = {
            accID: entity.accID
        }
        delete entity.accID;
        return db.patch(TBL_ACC, entity, condition);
    },
    add: (entity) => {
        return db.add(TBL_ACC, entity);
    },
    del: function(id){
        console.log(id);
        const condition ={
            accID: id
        }
        console.log(condition); 
        return db.del(TBL_ACC, condition);
    }
    
}