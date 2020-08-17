const db = require('../utils/db');
const TBL_ACC = 'account';
const TBL_DETAIL_ACC = 'detail_account';

module.exports = {
    all: () => {
        return db.load(`select * from ${TBL_ACC} order by accID`);
    },
    alltypestatus: () => {
        return db.load(`select * from ${TBL_DETAIL_ACC}`)
    },
    single: (id) => {
        return db.load(`select*from ${TBL_ACC} where accID="${id}"`);
    },
    singleByUsername: (usn) => {
        return db.load(`select*from ${TBL_ACC} where username="${usn}"`);
    },
    // singleType: (id)=>{
    //     return db.load(`select  a.type , d.status  
    //                     from ${TBL_ACC} a join ${TBL_DETAIL_ACC} d on  a.type = d.typeID
    //                     where accID="${id}"`);
    // },
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
    del: function(id) {
        const condition = {
            accID: id
        }
        return db.del(TBL_ACC, condition);
    }

}