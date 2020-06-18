const db = require('../utils/db');
const TBL_ACC = 'account';

module.exports = {
    all: () => {
        return db.load(`select * from ${TBL_ACC} order by accID`);
    },
    single: (id) => {
        return db.load(`select*from ${TBL_ACC} where accID="${id}"`);
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
    }
}