const db = require('../utils/db');
const TBL_CATE = 'categories';

module.exports = {
    all: () => {
        return db.load(`select * from ${TBL_CATE} order by catID`);
    },
    single: (id) => {
        return db.load(`select*from ${TBL_CATE} where accID="${id}"`);
    },
    singleByUsername: (usn) => {
        return db.load(`select*from ${TBL_CATE} where username="${usn}"`);
    },
    patch: (entity) => {
        const condition = {
            accID: entity.accID
        }
        delete entity.accID;
        return db.patch(TBL_CATE, entity, condition);
    },
    add: (entity) => {
        return db.add(TBL_CATE, entity);
    }
}