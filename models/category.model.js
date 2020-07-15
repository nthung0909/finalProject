const db = require('../utils/db');
const TBL_CATE = 'categories';

module.exports = {
    all: () => {
        return db.load(`select * from ${TBL_CATE}`);
    },
    single: (id) => {
        return db.load(`select*from ${TBL_CATE} where catID="${id}"`);
    },
    singleByUsername: (catname) => {
        return db.load(`select*from ${TBL_CATE} where catName=N"${catname}"`);
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